# Debiton – www.debiton.cz
# Run `make` (or `make help`) to see the available targets.
#
# Variables you can override:
#   THEME=<name>     build/serve with another theme from themes/ (default: hugo.yaml)
#   CHANNEL=<name>   Firebase preview channel for `make deploy-preview` (default: git branch)
#   PROJECT=<id>     Firebase project (default: .firebaserc → stuchlikova-static)

SHELL := /bin/bash
.DEFAULT_GOAL := help

PUBLIC   := public
FIREBASE := npx --no-install firebase
PROJECT  ?= stuchlikova-static
SITE     := debiton-cz
CHANNEL  ?= $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null | tr -c 'a-zA-Z0-9-\n' '-' | cut -c1-40)
HUGO_THEME_FLAG := $(if $(THEME),--theme $(THEME),)

.PHONY: help install serve build check preview deploy-preview deploy login sites clean

help: ## Show this help
	@awk 'BEGIN {FS = ":.*## "} /^[a-zA-Z_-]+:.*## / {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install Node dependencies (Tailwind CSS, Firebase CLI, CSS purge)
	npm ci

node_modules: package-lock.json
	npm ci
	@touch node_modules

serve: node_modules ## Dev server with live reload → http://localhost:1313/cs/
	hugo server $(HUGO_THEME_FLAG) --port 1313 --disableFastRender --renderToMemory

build: node_modules ## Production build into public/ (minify, per-page CSS purge, localized home pages)
	rm -rf $(PUBLIC) resources/_gen/assets
	hugo --gc --minify --environment production $(HUGO_THEME_FLAG) --destination $(PUBLIC)
	node scripts/purge-inline-css.js $(PUBLIC)
	scripts/localize-home.sh $(PUBLIC)

check: build ## Build and run sanity checks on the output
	@test -f $(PUBLIC)/index.html || { echo "check: missing public/index.html"; exit 1; }
	@test -d $(PUBLIC)/localized-files || { echo "check: missing public/localized-files"; exit 1; }
	@! grep -rl 'data-purge' $(PUBLIC) --include='*.html' || { echo "check: un-purged <style data-purge> left (see above)"; exit 1; }
	@! grep -rlw 'XXX' $(PUBLIC) --include='*.html' || { echo "check: placeholder XXX found (see above)"; exit 1; }
	@! grep -rl 'localhost:1313' $(PUBLIC) || { echo "check: dev-server URLs in the build (see above)"; exit 1; }
	@echo "check: OK"

preview: build ## Build, then serve public/ exactly as Firebase would (i18n, redirects, headers) → http://localhost:5050
	$(FIREBASE) emulators:start --only hosting --project $(PROJECT)

deploy-preview: build ## Build and deploy to a temporary Firebase preview channel (7 days)
	$(FIREBASE) hosting:channel:deploy $(CHANNEL) --expires 7d --project $(PROJECT) --only $(SITE)

deploy: build ## Build and deploy to PRODUCTION (www.debiton.cz) – normally done by CI on merge to main
	@read -p "Deploy to PRODUCTION site $(SITE) in project $(PROJECT)? [y/N] " ok && [ "$$ok" = y ]
	$(FIREBASE) deploy --only hosting:$(SITE) --project $(PROJECT)

login: ## Sign in to the Firebase CLI (opens a browser)
	$(FIREBASE) login

sites: ## List Firebase Hosting sites in the project
	$(FIREBASE) hosting:sites:list --project $(PROJECT)

clean: ## Remove build output and caches
	rm -rf $(PUBLIC) resources hugo_stats.json .hugo_build.lock
