# Debiton – www.debiton.cz

One-page website of **Debiton**, a debt-recovery service operated by NewCo Czech Companies, s.r.o.
Built with [Hugo](https://gohugo.io/) and [Tailwind CSS v4](https://tailwindcss.com/), hosted on
Firebase Hosting (project `stuchlikova-static`, site `debiton-cz`).

## Quick start

Requirements: Hugo ≥ 0.158 (`brew install hugo`), Node.js 22 (`.nvmrc`), make.

```bash
make install   # npm ci
make serve     # dev server with live reload → http://localhost:1313/cs/
make check     # production build + sanity checks
make preview   # production build served by the Firebase emulator → http://localhost:5050
```

Run `make` to list all targets.

| Target | What it does |
| --- | --- |
| `serve` | Hugo dev server (CSS/JS linked, not inlined). `/` only redirects to `/cs/` here. |
| `build` | Production build into `public/`: minified HTML, inlined CSS/JS, per-page CSS purge, language-detected home page. |
| `check` | `build` + checks (no leftover `XXX` placeholders, CSS purged, localized files present). |
| `preview` | `build` + Firebase Hosting emulator, i.e. with the real `firebase.json` rules (i18n, redirects, headers). |
| `deploy-preview` | `build` + deploy to a 7-day Firebase preview channel named after the git branch (needs `make login`). |
| `deploy` | `build` + deploy to **production** after a confirmation prompt. Normally CI does this. |
| `login`, `sites` | Firebase CLI sign-in; list Hosting sites in the project. |

`THEME=<name>` works with `serve`, `build`, `check`, `preview` and the deploys.

## Deployment (GitHub Actions)

- **Pull request** → build + `make check` → Firebase preview channel. The URL is posted as a PR comment and expires after 7 days (`.github/workflows/firebase-pr.yml`).
- **Push / merge to `main`** → build + `make check` → production (`.github/workflows/firebase.yml`).

Both workflows need the repository secret **`FIREBASE_SERVICE_ACCOUNT_STUCHLIKOVA_STATIC`**. It holds the JSON key of a service account with the *Firebase Hosting Admin* role in `stuchlikova-static`, the same kind of key that www.stuchlikova.com uses.

## Where things are

```text
hugo.yaml                 site config: languages, contacts (phone!), operator, form backend, reCAPTCHA key
content/<lang>/_index.md  all copy of the home page (front matter), one file per language
content/<lang>/*.md       other pages (privacy policy)
data/interest_rates.yaml  late-payment interest rates for the calculator (update every half-year)
data/tracking/*.yaml      analytics + cookie consent (OFF, see below)
static/                   favicon, og-image
themes/debiton/           the design: layouts, Tailwind CSS, JS, fonts, UI strings (i18n/)
scripts/                  post-build steps (CSS purge, localized home page)
firebase.json             hosting rules: i18n, headers, redirects
```

### Common edits

- **Phone number:** set `params.contact.phone` and `phoneRaw` in `hugo.yaml`. While they are empty, every phone link and "call us" sentence is hidden.
- **Text on the page:** `content/cs/_index.md`. Strings may contain HTML entities (`&nbsp;` keeps short words with the next word) and `<strong>`.
- **Interest rates:** add a row to `data/interest_rates.yaml` on 1 January and 1 July, and update `calculator.note` in the content.

## Languages

Every language has its own root (`/cs/`, `/en/`, …). The site root `/` is filled after the build by
`scripts/localize-home.sh`, which copies each language's home page to `public/localized-files/<lang>/`.
Firebase Hosting [i18n rewrites](https://firebase.google.com/docs/hosting/i18n-rewrites) then serve the
version matching the browser's preferred language, falling back to Czech. This is the same setup as
www.stuchlikova.com.

To add a language, for example English:

1. Add `en` under `languages` in `hugo.yaml` (`locale`, `label`, `weight`, `contentDir: content/en`, `params.ogLocale`, `params.description`).
2. Copy `content/cs/` to `content/en/` and translate it. Keep the keys and translate only the values. Fix the language-specific links (`/en/…`).
3. Add `themes/debiton/i18n/en.yaml` (copy `cs.yaml`).
4. `make preview` and test with an English browser.

## Themes

The design is a Hugo theme (`themes/debiton/`) that only reads `content/`, `data/` and `params`. To try
a different look, copy the theme to `themes/<new>/`, change it, and run `make serve THEME=<new>`. To
switch for good, set `theme:` in `hugo.yaml`.

Tailwind CSS v4 runs through Hugo (`css.TailwindCSS`) and scans `hugo_stats.json`, so only classes that
appear in rendered HTML end up in the CSS. Classes used only in JavaScript strings are lost. Put
representative markup in a `<template>` instead, as the calculator rows and file chips do. Production
CSS is inlined and then trimmed per page by `scripts/purge-inline-css.js`, ported from
www.stuchlikova.com.

## Enquiry form

The form posts to the existing Cloud Function of www.stuchlikova.com:
`https://www.stuchlikova.com/form?_action=debtrecovery` (repo `ziizii/stuchlikova-cloud-functions`).

- Files go to GCS (deleted after 30 days). The notification goes to **info@stuchlikova.com**, and its comment starts with `[Poptávka z webu Debiton]`.
- The URL must stay absolute on www.stuchlikova.com. The function picks the recipient from the request host, and any host other than www.stuchlikova.com sends the e-mail to a developer address instead (`determinMailRecipient`).
- The backend redirects back to the page with `#alert=thankYou` / `#alert=submitError`.
- The reCAPTCHA v3 site key is shared with stuchlikova.com. **`debiton.cz` and `www.debiton.cz` must be on the key's allowed domains**, otherwise submissions are rejected. The same applies to localhost and preview-channel domains if you want to test the form there.
- reCAPTCHA loads only when the form is first used.

## Analytics and cookies

`data/tracking/` holds a Google-Tag-Manager-free GA4/Ads + cookie-consent module (the same as on
www.stuchlikova.com). It is **switched off**, and while it is off nothing is rendered. The privacy policy
currently says the site uses no analytics or marketing cookies. Before enabling it, fill in the IDs in
`google.yaml`, enable `consent.yaml`, and have the privacy policy (section 7) updated.
