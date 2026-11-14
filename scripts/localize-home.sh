#!/usr/bin/env bash
# Post-build step: language-detected home page on "/" via Firebase Hosting i18n.
#
# Hugo renders every language in its own root (public/cs/, public/en/, …).
# Firebase Hosting i18n (firebase.json → hosting.i18n.root) serves
# public/localized-files/<lang>/<path> for a request to /<path> when <lang>
# matches the visitor's Accept-Language, and falls back to public/<path>.
#
# This script copies, for every language Hugo built:
#   public/<lang>/index.html → public/localized-files/<lang>/index.html
#   public/<lang>/404.html   → public/localized-files/<lang>/404.html
# and the default language's pages to public/index.html and public/404.html
# (the fallback for every other browser language; replaces Hugo's redirect stub).
#
# Usage: scripts/localize-home.sh [public-dir]   (run after `hugo`)
set -euo pipefail

PUBLIC="${1:-public}"
cd "$(dirname "$0")/.."

# Languages and the default language straight from the Hugo config, so adding a
# language in hugo.yaml needs no change here.
read -r DEFAULT LANGS < <(hugo config --format json | node -e '
  let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
    const c = JSON.parse(s);
    const langs = Object.keys(c.languages || {});
    const def = c.defaultcontentlanguage || langs[0];
    console.log(def + " " + langs.join(" "));
  });')

[ -f "$PUBLIC/$DEFAULT/index.html" ] || { echo "localize-home: $PUBLIC/$DEFAULT/index.html missing – run hugo first" >&2; exit 1; }

rm -rf "$PUBLIC/localized-files"
for lang in $LANGS; do
  for page in index.html 404.html; do
    if [ -f "$PUBLIC/$lang/$page" ]; then
      mkdir -p "$PUBLIC/localized-files/$lang"
      cp "$PUBLIC/$lang/$page" "$PUBLIC/localized-files/$lang/$page"
    fi
  done
  echo "localize-home: $lang → /localized-files/$lang/"
done

cp "$PUBLIC/$DEFAULT/index.html" "$PUBLIC/index.html"
[ -f "$PUBLIC/$DEFAULT/404.html" ] && cp "$PUBLIC/$DEFAULT/404.html" "$PUBLIC/404.html"
echo "localize-home: default $DEFAULT → /index.html"
