// Analytics + cookie consent, configured in data/tracking/*.yaml (replaces
// Google Tag Manager). Inlined at the end of <body> by _partials/tracking.html
// with the config as `cfg`. Everything that costs anything runs after load.
(function (cfg) {
  var w = window;
  var d = document;
  var google = cfg.google || {};
  var consent = cfg.consent || {};
  var categories = consent.categories || [];
  var live = !!google.enabled && (google.hosts || []).indexOf(location.hostname) !== -1;

  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  w.gtag = gtag;

  function afterLoad(fn) {
    function idle() { (w.requestIdleCallback || function (f) { setTimeout(f, 1); })(fn, { timeout: 2000 }); }
    if (d.readyState === 'complete') idle();
    else w.addEventListener('load', idle, { once: true });
  }

  // --- Consent ---------------------------------------------------------------

  function readChoice() {
    if (!consent.enabled) return null;
    var m = d.cookie.match(new RegExp('(?:^|; )' + consent.cookie + '=([^;]*)'));
    try {
      var choice = m && JSON.parse(decodeURIComponent(m[1]));
      return choice && choice.revision === consent.revision ? choice : null;
    } catch (e) {
      return null;
    }
  }

  function consentState(choice) {
    var state = {};
    categories.forEach(function (c) {
      var granted = c.required || !consent.enabled || !!(choice && choice[c.id]);
      (c.google || []).forEach(function (signal) { state[signal] = granted ? 'granted' : 'denied'; });
    });
    return state;
  }

  function anyGranted(choice) {
    return !consent.enabled || categories.some(function (c) { return !c.required && choice && choice[c.id]; });
  }

  var choice = readChoice();
  gtag('consent', 'default', consentState(choice));

  // --- Google tags -----------------------------------------------------------

  gtag('js', new Date());
  if (google.ga4) gtag('config', google.ga4);
  if (google.ads) gtag('config', google.ads);

  var googleLoaded = false;
  function loadGoogle() {
    if (googleLoaded || !live || !(google.ga4 || google.ads)) return;
    if (!consent.loadBeforeConsent && !anyGranted(choice)) return;
    googleLoaded = true;
    afterLoad(function () {
      var s = d.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (google.ga4 || google.ads);
      d.head.appendChild(s);
    });
  }

  // --- Events ----------------------------------------------------------------

  var rules = cfg.events || [];

  function fire(rule, el) {
    var vars = {
      page_url: location.href,
      page_path: location.pathname,
      page_title: d.title,
      referrer: d.referrer,
      click_url: (el && el.href) || '',
      click_text: el ? (el.innerText || el.textContent || '').trim().slice(0, 100) : ''
    };
    var params = {};
    Object.keys(rule.params || {}).forEach(function (key) {
      params[key] = String(rule.params[key]).replace(/\{(\w+)\}/g, function (all, v) { return v in vars ? vars[v] : all; });
    });
    if (rule.ga4 && google.ga4) gtag('event', rule.ga4, Object.assign({ send_to: google.ga4 }, params));
    if (rule.adsConversion && google.ads) gtag('event', 'conversion', { send_to: google.ads + '/' + rule.adsConversion });
    if (!live) console.info('[tracking]', rule.name, rule.ga4 || '', params, rule.adsConversion ? 'Ads: ' + rule.adsConversion : '');
  }

  function bareHost(host) { return host.replace(/^www\./, ''); }

  d.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    rules.forEach(function (rule) {
      var on = rule.on || {};
      try {
        var el = null;
        if (on.click) {
          el = e.target.closest(on.click);
        } else if (on.outbound) {
          el = e.target.closest('a[href]');
          if (el && !(/^https?:$/.test(el.protocol) && bareHost(el.hostname) !== bareHost(location.hostname))) el = null;
        }
        if (el) fire(rule, el);
      } catch (err) {
        console.error('[tracking] rule "' + rule.name + '":', err);
      }
    });
  }, true);

  rules.forEach(function (rule) {
    var on = rule.on || {};
    if (on.urlContains && location.href.indexOf(on.urlContains) !== -1) fire(rule);
  });

  // For site code: window.track('name') fires rules with `on: {event: name}`.
  w.track = function (name) {
    rules.forEach(function (rule) { if ((rule.on || {}).event === name) fire(rule); });
  };

  // --- Banner ----------------------------------------------------------------

  var banner = d.getElementById('consent');

  function openBanner(settings) {
    var current = readChoice() || {};
    banner.querySelectorAll('input[data-category]').forEach(function (input) {
      if (!input.disabled) input.checked = !!current[input.getAttribute('data-category')];
    });
    banner.querySelector('[data-consent-view="main"]').classList.toggle('hidden', settings);
    banner.querySelector('[data-consent-view="settings"]').classList.toggle('hidden', !settings);
    banner.classList.remove('hidden');
  }

  function decide(all) {
    choice = { revision: consent.revision, date: new Date().toISOString() };
    categories.forEach(function (c) {
      if (c.required) return;
      var input = banner.querySelector('input[data-category="' + c.id + '"]');
      choice[c.id] = all === undefined ? !!(input && input.checked) : all;
    });
    d.cookie = consent.cookie + '=' + encodeURIComponent(JSON.stringify(choice)) +
      '; max-age=' + consent.expiresDays * 86400 + '; path=/; SameSite=Lax' +
      (location.protocol === 'https:' ? '; Secure' : '');
    gtag('consent', 'update', consentState(choice));
    if (!live) console.info('[tracking] consent', choice);
    banner.classList.add('hidden');
    loadGoogle();
  }

  if (consent.enabled && banner) {
    d.addEventListener('click', function (e) {
      var button = e.target.closest && e.target.closest('[data-consent]');
      if (!button) return;
      e.preventDefault();
      var action = button.getAttribute('data-consent');
      if (action === 'all') decide(true);
      else if (action === 'necessary') decide(false);
      else if (action === 'save') decide();
      else if (action === 'settings') openBanner(true);
    });
    if (!choice) afterLoad(function () { setTimeout(function () { openBanner(false); }, consent.showDelayMs || 0); });
  }

  loadGoogle();
})(window.trackingConfig || {});
