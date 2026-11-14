#!/usr/bin/env node
// Per-page CSS purge for the production build.
//
// Hugo inlines the whole Tailwind build (purged against hugo_stats.json, i.e.
// every class used anywhere on the site) into every page as
// <style data-purge>…</style> (themes/web2024/layouts/partials/head.html).
// This script runs after Hugo and shrinks that block, page by page, to the
// selectors that can match something on that very page.
//
// What counts as present on a page:
//   - tags, ids, classes, attribute names and values of the parsed HTML;
//   - every class-like token anywhere in the raw page text, so classes that are
//     only toggled from inline <script>s ('hidden', 'compact', …) survive.
//
// A selector is kept when every class/id/tag/attribute it requires is present.
// Combinators, :hover/::before/:nth-child(…) etc. are ignored, :not(…) never
// requires anything, and :is/:where/:has(…) need any one of their arguments.
// This over-approximates (keeps a bit too much), never under-approximates.
// (PurgeCSS was tried first: it drops Tailwind Typography's
// `:is(:where(h1,…):not(:where([class~="not-prose"] *)))` rules.)
//
// Usage: node scripts/purge-inline-css.js [publicDir]

const fs = require('fs');
const path = require('path');
const os = require('os');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const STYLE_RE = /<style data-purge>([\s\S]*?)<\/style>/;

function listHtmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listHtmlFiles(p));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

async function worker() {
  const postcss = require('postcss');
  const selectorParser = require('postcss-selector-parser');
  const extractHtml = require('purgecss-from-html');
  // Tailwind-style tokens (md:flex, group-[.compact]:py-1, w-1/2, …).
  const TOKEN_RE = /[^<>"'`\s]*[^<>"'`\s:]/g;
  const ANY_OF = new Set([':is', ':where', ':has', ':matches', ':-webkit-any', ':-moz-any']);

  function pageTokens(content) {
    const html = extractHtml(content);
    const tokens = new Set([...html.classes, ...html.ids, ...html.attributes.names, ...html.attributes.values]);
    for (const tag of html.tags) tokens.add(tag.toLowerCase());
    for (const t of content.match(TOKEN_RE) || []) {
      tokens.add(t);
      // Unquoted minified attributes: class=md:flex, dir=rtl.
      for (const part of t.split('=')) tokens.add(part);
    }
    return tokens;
  }

  // Can this (complex) selector match given the page's tokens?
  function possible(selector, tokens) {
    return selector.nodes.every((node) => {
      switch (node.type) {
        case 'class':
        case 'id':
          return tokens.has(node.value);
        case 'tag':
          return tokens.has(node.value.toLowerCase());
        case 'attribute':
          if (!tokens.has(node.attribute)) return false;
          if (node.operator === '~=' && node.attribute === 'class') return tokens.has(node.value);
          if (node.operator === '=') return tokens.has(node.value);
          return true;
        case 'pseudo': {
          const name = node.value.toLowerCase();
          if (ANY_OF.has(name)) return node.nodes.some((s) => possible(s, tokens));
          return true; // :not(…), :hover, ::before, :nth-child(…), …
        }
        default:
          return true; // combinators, universal, nesting, comments
      }
    });
  }

  function purge(css, tokens) {
    const root = postcss.parse(css);
    root.walkRules((rule) => {
      if (rule.parent.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
      let kept;
      const result = selectorParser((sels) => {
        sels.each((s) => { if (!possible(s, tokens)) s.remove(); });
        kept = sels.nodes.length > 0;
      }).processSync(rule.selector);
      if (kept) rule.selector = result;
      else rule.remove();
    });
    // Drop at-rules emptied by the purge (@media, @supports, …).
    let removed;
    do {
      removed = false;
      root.walkAtRules((at) => {
        if (at.nodes && at.nodes.length === 0) { at.remove(); removed = true; }
      });
    } while (removed);
    // Drop @keyframes / @font-face that no remaining declaration refers to.
    const used = [];
    root.walkDecls(/^(animation|animation-name|font|font-family)$/i, (d) => used.push(d.value));
    const usedText = used.join(' ');
    const usedWords = new Set(usedText.split(/[\s,]+/));
    root.walkAtRules((at) => {
      if (/keyframes$/i.test(at.name) && !usedWords.has(at.params.trim())) at.remove();
      if (at.name === 'font-face') {
        let family = '';
        at.walkDecls('font-family', (d) => { family = d.value.replace(/['"]/g, ''); });
        if (family && !usedText.replace(/['"]/g, '').includes(family)) at.remove();
      }
    });
    return root.toString();
  }

  let before = 0;
  let after = 0;
  let pages = 0;
  for (const file of workerData.files) {
    const html = fs.readFileSync(file, 'utf8');
    const match = html.match(STYLE_RE);
    if (!match) continue;
    const css = match[1];
    // Scan the page without its own stylesheet, or every rule would match itself.
    const content = html.slice(0, match.index) + html.slice(match.index + match[0].length);
    const purged = purge(css, pageTokens(content));
    fs.writeFileSync(file, html.slice(0, match.index) + `<style>${purged}</style>` + html.slice(match.index + match[0].length));
    before += css.length;
    after += purged.length;
    pages++;
  }
  parentPort.postMessage({ before, after, pages });
}

async function main() {
  const publicDir = process.argv[2] || 'public';
  const files = listHtmlFiles(publicDir);
  const threads = Math.max(1, Math.min(os.cpus().length, 8));
  const chunks = Array.from({ length: threads }, (_, i) => files.filter((_, j) => j % threads === i));
  const started = Date.now();

  const results = await Promise.all(chunks.map((chunk) => new Promise((resolve, reject) => {
    const w = new Worker(__filename, { workerData: { files: chunk } });
    w.once('message', resolve);
    w.once('error', reject);
    w.once('exit', (code) => code && reject(new Error(`purge worker exited with ${code}`)));
  })));

  const total = results.reduce((a, r) => ({ before: a.before + r.before, after: a.after + r.after, pages: a.pages + r.pages }), { before: 0, after: 0, pages: 0 });
  const avg = (n) => (total.pages ? (n / total.pages / 1024).toFixed(1) : 0);
  console.log(`purge-inline-css: ${total.pages} pages, inline CSS avg ${avg(total.before)} KiB -> ${avg(total.after)} KiB ` +
    `(${((Date.now() - started) / 1000).toFixed(1)} s)`);
}

if (isMainThread) {
  main().catch((err) => { console.error(err); process.exit(1); });
} else {
  worker().catch((err) => { console.error(err); process.exit(1); });
}
