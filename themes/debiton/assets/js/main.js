// Debiton home page: mobile menu, sticky CTA, "paid" stamp, interest
// calculator, the enquiry form and the contact form. Settings and translated strings come from
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

  /* floating CTA on mobile: after the hero, but not over the forms or footer */
  var mcta = $('mcta'), formSection = $('debtForm') && $('debtForm').closest('section');
  var contactSection = $('contactForm') && $('contactForm').closest('section');
  if (mcta && formSection && 'IntersectionObserver' in window) {
    var heroGone = false, hide = {};
    var upd = function () { mcta.classList.toggle('on', heroGone && !hide.form && !hide.contact && !hide.foot); };
    new IntersectionObserver(function (es) { heroGone = !es[0].isIntersecting; upd(); }).observe(document.querySelector('.ctas'));
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { hide[e.target === formSection ? 'form' : e.target === contactSection ? 'contact' : 'foot'] = e.isIntersecting; });
      upd();
    });
    io.observe(formSection); io.observe($('foot'));
    if (contactSection) io.observe(contactSection);
  }

  /* late-payment interest calculator */
  var rowsEl = $('rows'), rowTpl = $('rowTpl'), rowSeq = 0;
  function rateFor(delayStart) {
    // CFG.rates: [{from: 'YYYY-MM-DD', rate: % p.a.}, …] from data/interest_rates.yaml, oldest first
    var r = CFG.rates[0].rate;
    for (var i = 0; i < CFG.rates.length; i++) { if (delayStart >= new Date(CFG.rates[i].from + 'T00:00:00')) r = CFG.rates[i].rate; }
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

  /* shared by both forms */
  var hash = location.hash || '';
  // Back from the backend: #alert=… (see the hidden _next / _next_error fields).
  // Jump (not smooth-scroll) once the page has loaded: a smooth scroll started
  // during load can be cancelled by the browser and leave the visitor at the top.
  function jumpTo(el, block) {
    var go = function () { el.scrollIntoView({ block: block, behavior: 'instant' }); };
    if (document.readyState === 'complete') setTimeout(go, 0);
    else window.addEventListener('load', function () { setTimeout(go, 0); }, { once: true });
  }

  // reCAPTCHA v3 is loaded only when a form is first used
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
      recaptcha.catch(function () {}); // blocked: each submit falls back to a plain POST
    }
    return recaptcha;
  }

  // Either a valid e-mail or a phone number (the backend requires one of them).
  // Returns an error message, or '' when the contact is fine.
  function contactError(email, phone) {
    if (!email && !phone) return MSG.contact;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return MSG.email;
    if (phone && phone.replace(/\D/g, '').length < 6) return MSG.phone;
    return '';
  }

  // Post the form for real once the reCAPTCHA token is in (or reCAPTCHA failed:
  // then the server decides).
  function submitWithRecaptcha(f) {
    var go = function () { HTMLFormElement.prototype.submit.call(f); };
    loadRecaptcha().then(function () {
      return window.grecaptcha.execute(CFG.siteKey, { action: 'sendForm' });
    }).then(function (token) {
      f.querySelector('input[name=_recaptcha_response]').value = token;
      go();
    }).catch(go);
  }

  // Return to the page the form was sent from (also on previews and "/")
  function setReturn(okEl, errEl, ok, err) {
    if (!/^https?:/.test(location.protocol)) return;
    var base = location.origin + location.pathname;
    okEl.value = base + '#alert=' + ok;
    errEl.value = base + '#alert=' + err;
  }

  /* contact form (bottom of the page): same backend as the enquiry form, no files */
  var cForm = $('contactForm');
  if (cForm) {
    var cThanks = $('contactThanks'), cSubmitError = $('ctSubmitError'), cClientError = $('ctClientError');
    if (hash.indexOf('alert=contactThankYou') > -1) {
      cForm.hidden = true; cThanks.hidden = false;
      cThanks.focus({ preventScroll: true });
      jumpTo(cThanks, 'center');
    } else if (hash.indexOf('alert=contactError') > -1) {
      cSubmitError.hidden = false;
      jumpTo(cForm, 'start');
    }
    cForm.addEventListener('focusin', loadRecaptcha, { once: true });
    var cSending = false;
    cForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (cSending) return;
      cSubmitError.hidden = true;
      var name = $('ctName').value.trim(), text = $('ctMessage').value.trim();
      var err = contactError($('ctEmail').value.trim(), $('ctPhone').value.trim()) || (text ? '' : MSG.contactMessage);
      if (err) { cClientError.textContent = err; cClientError.hidden = false; return; }
      cClientError.hidden = true;
      // The backend only knows "Message": tag and name go into its text
      $('ctMessageOut').value = MSG.contactTag + (name ? '\n' + MSG.contactNamePrefix + name : '') + '\n\n' + text;
      setReturn($('ctNextOk'), $('ctNextErr'), 'contactThankYou', 'contactError');
      cSending = true;
      $('ctSubmit').disabled = true;
      $('ctSpinner').hidden = false;
      $('ctSubmitLabel').textContent = MSG.sending;
      submitWithRecaptcha(cForm);
    });
  }

  /* enquiry form */
  var form = $('debtForm');
  if (!form) return;
  var thanks = $('thankYou'), submitError = $('submitError');
  var input = $('files'), drop = $('drop'), chips = $('chips'), chipTpl = $('chipTpl'), clientError = $('clientError');
  var store = (typeof DataTransfer === 'function') ? new DataTransfer() : null;

  if (hash.indexOf('alert=thankYou') > -1) {
    form.hidden = true; thanks.hidden = false;
    thanks.focus({ preventScroll: true });
    jumpTo(thanks, 'center');
  } else if (hash.indexOf('alert=submitError') > -1) {
    submitError.hidden = false;
    jumpTo(form, 'start');
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

  form.addEventListener('focusin', loadRecaptcha, { once: true });

  function showError(msg) { clientError.textContent = msg; clientError.hidden = false; }

  var sending = false;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    submitError.hidden = true;

    var cErr = contactError($('email').value.trim(), $('phone').value.trim());
    if (cErr) return showError(cErr);
    if (totalSize() > CFG.maxTotal) return showError(MSG.size);
    clientError.hidden = true;

    // Source tag and company go into the e-mail text (the backend only knows "Message")
    var comment = $('message').value.trim(), company = $('company').value.trim();
    $('messageOut').value = CFG.sourceTag + (company ? '\n' + CFG.companyPrefix + company : '') + (comment ? '\n\n' + comment : '');

    setReturn($('nextOk'), $('nextErr'), 'thankYou', 'submitError');

    sending = true;
    $('submit').disabled = true;
    $('spinner').hidden = false;
    $('submitLabel').textContent = MSG.sending;
    $('sendingNote').hidden = false;

    submitWithRecaptcha(form);
  });
})();
