// Debiton home page: mobile menu, sticky CTA, "paid" stamp, interest
// calculator and the enquiry form. Settings and translated strings come from
// <script id="debiton-config"> (layouts/_partials/home/script.html).
(function () {
  'use strict';
  var cfgEl = document.getElementById('debiton-config');
  if (!cfgEl) return;
  var CFG = JSON.parse(cfgEl.textContent);
  var MSG = CFG.msg;

  var $ = function (id) { return document.getElementById(id); };
  var money = new Intl.NumberFormat(CFG.locale, { style: 'currency', currency: 'CZK', maximumFractionDigits: 0, minimumFractionDigits: 0 });
  var dateFmt = new Intl.DateTimeFormat(CFG.locale, { day: 'numeric', month: 'numeric', year: 'numeric' });
  var plural = new Intl.PluralRules(CFG.locale);
  function kc(n) { return money.format(Math.round(n)); }
  function todayLocal() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function fmtDate(d) { return dateFmt.format(d); }
  function isoDate(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }

  /* "paid" stamp: today's date; strike "overdue" when the stamp lands */
  if ($('stampDate')) $('stampDate').textContent = fmtDate(todayLocal());
  setTimeout(function () { var inv = $('invoice'); if (inv) inv.classList.add('paid'); },
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1250);

  /* mobile menu */
  var menuBtn = document.querySelector('.menu-btn'), nav = $('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.textContent = open ? MSG.menuClose : MSG.menu;
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A' && nav.classList.contains('open')) setMenu(false); });
  }

  /* floating CTA on mobile: after the hero, but not over the form or footer */
  var mcta = $('mcta'), formSection = $('debtForm') && $('debtForm').closest('section');
  if (mcta && formSection && 'IntersectionObserver' in window) {
    var heroGone = false, hide = {};
    var upd = function () { mcta.classList.toggle('on', heroGone && !hide.form && !hide.foot); };
    new IntersectionObserver(function (es) { heroGone = !es[0].isIntersecting; upd(); }).observe(document.querySelector('.ctas'));
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { hide[e.target === formSection ? 'form' : 'foot'] = e.isIntersecting; });
      upd();
    });
    io.observe(formSection); io.observe($('foot'));
  }

  /* late-payment interest calculator */
  var rowsEl = $('rows'), rowTpl = $('rowTpl'), rowSeq = 0;
  function rateFor(delayStart) {
    var r = CFG.rates[0][1];
    for (var i = 0; i < CFG.rates.length; i++) { if (delayStart >= new Date(CFG.rates[i][0] + 'T00:00:00')) r = CFG.rates[i][1]; }
    return r;
  }
  function addRow(amount, due) {
    rowSeq++;
    var row = rowTpl.content.firstElementChild.cloneNode(true);
    var amt = row.querySelector('.amt'), dueIn = row.querySelector('.due'), labels = row.querySelectorAll('label');
    amt.id = 'amt' + rowSeq; labels[0].htmlFor = amt.id;
    dueIn.id = 'due' + rowSeq; labels[1].htmlFor = dueIn.id;
    if (amount) amt.value = amount;
    if (due) dueIn.value = due;
    row.querySelector('.x').addEventListener('click', function () {
      if (rowsEl.children.length > 1) { row.remove(); } else { amt.value = ''; dueIn.value = ''; }
      calc();
    });
    rowsEl.appendChild(row);
    return row;
  }
  function parseAmount(s) { var n = parseFloat(String(s).replace(/[\s  ]/g, '').replace(',', '.')); return isFinite(n) && n > 0 ? n : 0; }
  function feeLabel(n) {
    if (!MSG.feeCount) return null;
    var words = MSG.invoiceWords || {};
    return MSG.feeCount.replace('{n}', n).replace('{invoices}', words[plural.select(n)] || words.other || '');
  }
  function calc() {
    var today = todayLocal(), P = 0, I = 0, n = 0, lines = [];
    Array.prototype.forEach.call(rowsEl.children, function (row) {
      var a = parseAmount(row.querySelector('.amt').value), dv = row.querySelector('.due').value, warn = row.querySelector('.warn');
      warn.hidden = true;
      if (!a) return;
      P += a; n++;
      if (!dv) { lines.push(kc(a)); return; }
      var due = new Date(dv + 'T00:00:00');
      var days = Math.round((today - due) / 86400000);
      if (days <= 0) { warn.textContent = MSG.warnNotDue; warn.hidden = false; lines.push(kc(a) + ', ' + MSG.dueWord + ' ' + fmtDate(due)); return; }
      var start = new Date(due.getTime()); start.setDate(start.getDate() + 1);
      I += a * rateFor(start) / 100 * days / 365;
      if (days > 3 * 365) { warn.textContent = MSG.warnOld; warn.hidden = false; }
      lines.push(kc(a) + ', ' + MSG.dueWord + ' ' + fmtDate(due));
    });
    $('cPrincipal').textContent = kc(P);
    $('cInterest').textContent = kc(I);
    var fl = feeLabel(n); if (fl) $('cFeeLabel').textContent = fl;
    $('cFee').textContent = kc(n * CFG.fee);
    $('cTotal').textContent = kc(P + I + n * CFG.fee);
    $('cYou').textContent = kc(P);
    calc.lines = lines;
  }
  if (rowsEl && rowTpl) {
    rowsEl.addEventListener('input', calc);
    $('addRow').addEventListener('click', function () { addRow().querySelector('.amt').focus(); calc(); });
    var ex = todayLocal(); ex.setDate(ex.getDate() - 40);
    addRow(money.format(50000).replace(/[^\d\s  ]/g, '').trim(), isoDate(ex));
    calc();
    // "Upload these invoices": pre-fill the form comment with the invoices entered
    $('calcCta').addEventListener('click', function () {
      var msg = $('message');
      if (calc.lines && calc.lines.length && !msg.value.trim()) {
        msg.value = MSG.messagePrefix + '\n' + calc.lines.map(function (l) { return '– ' + l; }).join('\n');
      }
    });
  }

  /* enquiry form */
  var form = $('debtForm');
  if (!form) return;
  var thanks = $('thankYou'), submitError = $('submitError');
  var input = $('files'), drop = $('drop'), chips = $('chips'), chipTpl = $('chipTpl'), clientError = $('clientError');
  var store = (typeof DataTransfer === 'function') ? new DataTransfer() : null;

  // Back from the backend: #alert=thankYou / #alert=submitError
  var hash = location.hash || '';
  if (hash.indexOf('alert=thankYou') > -1) {
    form.hidden = true; thanks.hidden = false;
    setTimeout(function () { thanks.scrollIntoView({ block: 'center' }); thanks.focus({ preventScroll: true }); }, 50);
  } else if (hash.indexOf('alert=submitError') > -1) {
    submitError.hidden = false;
    setTimeout(function () { form.scrollIntoView({ block: 'start' }); }, 50);
  }

  function fmtSize(b) {
    return b < 1048576 ? Math.max(1, Math.round(b / 1024)) + ' kB'
      : new Intl.NumberFormat(CFG.locale, { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(b / 1048576) + ' MB';
  }
  function totalSize() { var t = 0; Array.prototype.forEach.call(input.files || [], function (f) { t += f.size; }); return t; }
  function render() {
    chips.innerHTML = '';
    Array.prototype.forEach.call(input.files || [], function (f, i) {
      var row = chipTpl.content.firstElementChild.cloneNode(true);
      var name = row.querySelector('span'), btn = row.querySelector('button');
      name.textContent = f.name;
      var size = document.createElement('em'); size.textContent = fmtSize(f.size); name.appendChild(size);
      if (store) {
        btn.setAttribute('aria-label', MSG.removeFile + ' ' + f.name);
        btn.addEventListener('click', function () {
          var kept = new DataTransfer();
          Array.prototype.forEach.call(store.files, function (g, j) { if (j !== i) kept.items.add(g); });
          store = kept; input.files = store.files; render();
        });
      } else {
        btn.remove();
      }
      chips.appendChild(row);
    });
  }
  function addFiles(list) {
    if (!list || !list.length) return;
    if (store) { Array.prototype.forEach.call(list, function (f) { store.items.add(f); }); input.files = store.files; }
    else { input.files = list; }
    clientError.hidden = true; render();
  }
  drop.addEventListener('click', function () { input.click(); });
  drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
  input.addEventListener('change', function (e) {
    if (store) { var picked = Array.prototype.slice.call(e.target.files); input.files = store.files; addFiles(picked); }
    else { render(); }
  });
  ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
  ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function () { drop.classList.remove('over'); }); });
  drop.addEventListener('drop', function (e) { e.preventDefault(); if (e.dataTransfer) addFiles(e.dataTransfer.files); });

  // reCAPTCHA v3 is loaded only when the form is first used
  var recaptcha = null;
  function loadRecaptcha() {
    if (!recaptcha) {
      recaptcha = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = 'https://www.google.com/recaptcha/api.js?render=' + CFG.siteKey;
        s.async = true;
        s.onload = function () { window.grecaptcha.ready(resolve); };
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    return recaptcha;
  }
  form.addEventListener('focusin', loadRecaptcha, { once: true });

  function showError(msg) { clientError.textContent = msg; clientError.hidden = false; }

  var sending = false;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    submitError.hidden = true;

    var email = $('email').value.trim(), phone = $('phone').value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    var phoneOk = phone.replace(/\D/g, '').length >= 6;
    if (!email && !phone) return showError(MSG.contact);
    if (email && !emailOk) return showError(MSG.email);
    if (phone && !phoneOk) return showError(MSG.phone);
    if (totalSize() > CFG.maxTotal) return showError(MSG.size);
    clientError.hidden = true;

    // Source tag and company go into the e-mail text (the backend only knows "Message")
    var comment = $('message').value.trim(), company = $('company').value.trim();
    $('messageOut').value = CFG.sourceTag + (company ? '\n' + CFG.companyPrefix + company : '') + (comment ? '\n\n' + comment : '');

    // Return to the page the form was sent from (also on previews and "/")
    if (/^https?:/.test(location.protocol)) {
      var base = location.origin + location.pathname;
      $('nextOk').value = base + '#alert=thankYou';
      $('nextErr').value = base + '#alert=submitError';
    }

    sending = true;
    $('submit').disabled = true;
    $('spinner').hidden = false;
    $('submitLabel').textContent = MSG.sending;
    $('sendingNote').hidden = false;

    var go = function () { HTMLFormElement.prototype.submit.call(form); };
    loadRecaptcha().then(function () {
      return window.grecaptcha.execute(CFG.siteKey, { action: 'sendForm' });
    }).then(function (token) {
      form.querySelector('input[name=_recaptcha_response]').value = token;
      go();
    }).catch(go); // reCAPTCHA blocked: let the server decide
  });
})();
