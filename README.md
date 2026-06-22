<div align="center">

# Diametral Design System

> A minimal, flat, **buildless** design system — CSS + design tokens + Web Components + React.
> **Welcome to (the real).**

**Minimal · Enduring · Elegant**

🔗 **Live showcase:** https://littlebigcode.github.io/design-system/

</div>

---

Diametral is a flat, sharp visual language: **1px rules, no shadows, no border-radius**,
white / whitesmoke surfaces, black ink, **Ufficio** Light 300 titles over **Geist** body,
uppercase labels at `0.08em`, tabular numerals. It is deliberately away from the typical
color codes of tech and consulting — refined and structured.

It ships as:

- **CSS + design tokens** — a framework-agnostic stylesheet you add with one `<link>`.
- **`tokens.json`** — the single source of truth, plus generated **Tailwind preset** and **SCSS** variables.
- **Web Components** — an optional custom-element layer that needs no build.
- **React components** — real, typed React components ([`react/`](react/)), also buildless.

There is **no build step required to use it**.

The library spans **~50 components** — actions, forms, **data display (including a lazy-loading
data grid)**, feedback, navigation, overlays, data-viz and utilities — every one with a matching
React component, plus ready-made **page templates** (login, dashboard, 404). Browse them all in
the [live showcase](https://littlebigcode.github.io/design-system/).

## Quick start

**1 · Drop-in (the buildless path)**

```html
<!-- body font -->
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
<!-- the design system -->
<link rel="stylesheet" href="css/diametral.css">
<!-- optional: Ufficio titles (commercial license required — see below) -->
<link rel="stylesheet" href="assets/fonts/ufficio.css">
```

```html
<button class="ds-button ds-button--primary">Save</button>
```

**2 · `@import` from your stylesheet**

```css
@import url("css/diametral.css");
```

**3 · npm** *(optional)*

```bash
npm i @diametral/design-system
```

```js
import "@diametral/design-system/css/diametral.css";
import "@diametral/design-system/components"; // optional Web Components
```

**Web Components** (optional layer):

```html
<link rel="stylesheet" href="css/diametral.css">
<script type="module" src="components/index.js"></script>

<ds-button variant="primary">Save</ds-button>
<ds-status status="success" heading="Approved"></ds-status>
```

**React** (optional layer — real, typed components):

```jsx
import "@diametral/design-system/css/diametral.css";
import { Button, Status, Metric } from "@diametral/design-system/react";

<Button variant="primary">Save</Button>
```

See [`docs/react.md`](docs/react.md) and the live, buildless demo in
[`examples/react.html`](examples/react.html).

> The system is pure CSS + fonts + SVG + a sprinkle of vanilla JS for the Web Components.
> **No bundler, transpiler, or framework is needed to consume it.**

## Installation

Installing in a real project (npm or no-build) and integrating with Vite, Next.js, CRA, Angular,
Vue, Tailwind, or a CDN import map: see [`docs/installation.md`](docs/installation.md).

## Building applications

A kit to stand up an app fast on top of the components:

- **`<ConsoleLayout>`** — turnkey app chrome (app bar + data-driven sidebar nav + ⌘K palette +
  Light/Dark/Sepia switcher). Wrap a router and go.
- **Starter** — a clone-and-go **Vite + React + TS** app in [`starters/vite-react/`](starters/vite-react/).
- **Recipes** — end-to-end page patterns (app shell, CRUD, dashboard, auth, loading/empty/error) in
  [`docs/recipes.md`](docs/recipes.md).
- **Forms & data** — `useForm` + `<FormField>` ([`docs/forms.md`](docs/forms.md)) and
  `useResource` + `restLoadPage` ([`docs/data.md`](docs/data.md)).
- **Theme generator** — turn a brand color into a `data-theme` ([`docs/theme-generator.md`](docs/theme-generator.md)).
- **Shared configs** — ESLint, Prettier, base tsconfig and VS Code snippets in [`configs/`](configs/).
- **Icons** — a Lucide-compatible `<Icon>` / `<ds-icon>` line-icon set; any 24×24 stroke SVG drops in.
- **Emails** — on-brand, email-safe transactional templates (welcome, reset, OTP, notification, invoice, invite, digest, alert) in [`docs/emails.md`](docs/emails.md).
- **Streamlit (Python)** — theme config + CSS injection + `.ds-*` HTML blocks: [`docs/streamlit.md`](docs/streamlit.md).
- **Keycloak** — a drop-in theme for the login flow + transactional emails: [`keycloak/`](keycloak/).
- **Designer handoff** — `npm run build` emits Tokens Studio tokens for Figma ([`docs/figma.md`](docs/figma.md)).
- **AI assistants / Claude** — generate on-brand UI by giving Claude one reference file. See
  [**Use it with Claude**](#use-it-with-claude) below.
- **Tested** — visual-regression + axe accessibility checks in CI (`npm run test:visual` / `npm run test:a11y`).

## Use it with Claude

You can have **Claude generate on-brand Diametral UI** for you. The trick is one file:
[`docs/for-claude.md`](docs/for-claude.md) — a plain-English reference that describes the whole
system (principles, tokens, and every component as copy‑paste HTML) in a form Claude reads. You give
Claude that file once; then it builds screens using the real `.ds-*` classes.

Its raw URL (handy for pasting):
`https://raw.githubusercontent.com/LittleBigCode/design-system/main/docs/for-claude.md`

**Pick one of these — all work:**

1. **Design systems feature** — go to [claude.ai/design](https://claude.ai/design#design-systems),
   add a design system named *Diametral*, and paste the contents of `docs/for-claude.md` (or its raw
   URL). Then pick *Diametral* when you generate UI.
2. **A Claude Project** — create a Project and paste `docs/for-claude.md` into its custom
   instructions. Every chat in that Project then produces Diametral UI.
3. **Any chat (quick)** — paste the raw URL (or the file) into a message and ask for UI.

**Prompt that works well:**

> Build a settings page using the Diametral Design System in the reference I gave you. Output a
> standalone HTML artifact, include the stylesheet `<link>` from the doc, use only `.ds-*` classes,
> keep it flat (no radius/shadow), and make the primary action solid black.

**One gotcha for artifact previews.** The generated HTML loads the CSS from a CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/@diametral/design-system/dist/diametral.css">
```

If the artifact sandbox blocks that and the preview looks unstyled, just ask Claude to *"inline the
Diametral CSS in a `<style>` instead of the `<link>`"* — that renders everywhere.

> Verified: a fresh assistant given only `docs/for-claude.md` built a correct screen — 33 `.ds-*`
> classes, all real, flat / 1px / black primary.

## What's inside

| Foundations | Components |
|---|---|
| [Color](docs/foundations.md#color) · [Typography](docs/foundations.md#typography) | [Status panel](docs/components.md#status-panel) (signature) · [Buttons](docs/components.md#buttons) |
| [Spacing](docs/foundations.md#spacing) · [Layout](docs/foundations.md#layout) | [Toggle](docs/components.md#toggle-switch) · [Badges](docs/components.md#badges) · [Tabs](docs/components.md#tabs) |
| [Borders](docs/foundations.md#borders--rules) · [Motion](docs/foundations.md#motion) · [No radius](docs/no-radius.md) | [Form fields](docs/components.md#form-fields) · [Chips](docs/components.md#chips) · [Banner](docs/components.md#banner) |
| [Logo](docs/foundations.md#logo) · [Iconography](docs/foundations.md#iconography) · [Photography](docs/foundations.md#photography) | [Callout](docs/components.md#callout) · [Panel](docs/components.md#panel) · [Segmented](docs/components.md#segmented) |
| | [Metrics](docs/components.md#metrics) · [Modal](docs/components.md#modal) · [Table](docs/components.md#table) · [Dividers](docs/components.md#dividers) |

## Live showcase

A buildless, multi-page showcase that dogfoods the system lives in [`examples/`](examples/).

```bash
# from the repo root
python3 -m http.server 8080
# then open http://localhost:8080/examples/
```

It also works straight from the filesystem — open `examples/index.html` in a browser.
`examples/kitchen-sink.html` renders every component on one page.

## Token model

Three tiers, all `--ds-*` custom properties, defined in [`css/tokens.css`](css/tokens.css)
and sourced from [`tokens/tokens.json`](tokens/tokens.json):

1. **Primitives** — raw brand / neutral / functional values (`--ds-noir`, `--ds-rouge`, …).
2. **Semantic** — role aliases that components read and themes override (`--ds-ink`, `--ds-accent`, `--ds-success`, …).
3. **Scale** — spacing, type, layout, motion (`--ds-space-*`, `--ds-text-*`, `--ds-radius-none`, …).

See [`docs/tokens`](tokens/README.md). Theming overrides the **semantic** tier only — see
[`docs/theming.md`](docs/theming.md). A dark theme ships in [`css/themes/dark.css`](css/themes/dark.css).

## Optional build

The `css/` tree and `components/` modules work with no build. An optional script
produces convenience artifacts in `dist/` (gitignored):

```bash
npm run build          # tokens + bundled CSS + WC bundle
npm run build:tokens   # dist/tokens.css, dist/tokens.scss, dist/tailwind-preset.cjs
npm run build:css      # dist/diametral.css + dist/diametral.min.css
```

No third-party dependencies — the build uses Node built-ins only.

## Versioning & contributing

Semantic Versioning for a CSS system: token renames / class removals are **major**,
new tokens or components are **minor**, fixes are **patch**. See
[`CHANGELOG.md`](CHANGELOG.md), [`docs/versioning.md`](docs/versioning.md), and
[`CONTRIBUTING.md`](CONTRIBUTING.md). Publishing to npm / GitHub Packages: [`RELEASE.md`](RELEASE.md).

> ⚠️ **Font licensing.** **Ufficio is a commercial font**, bundled and served under
> Diametral's own font license (see [`NOTICE.md`](NOTICE.md)). This repository grants no
> rights to it — **third parties must obtain their own license**. If you don't hold one,
> simply don't import `ufficio.css`: titles fall back to the free **Fraunces** stack
> automatically. Geist (body) and Fraunces are free (SIL OFL 1.1). Details in
> [`docs/fonts-and-licensing.md`](docs/fonts-and-licensing.md).

## Directory layout

```
design-system/
├── css/                  Hand-authored, zero-build CSS
│   ├── diametral.css      Bundle entrypoint (@imports the rest)
│   ├── tokens.css         Tiers 1–3 tokens
│   ├── base/              reset · typography
│   ├── components/        one partial per .ds-* component
│   ├── themes/            dark · per-brand example (opt-in)
│   └── compat/            legacy aliases (opt-in migration shim)
├── components/           Web Components (vanilla ES modules)
├── tokens/tokens.json    Single source of truth
├── assets/               fonts (Ufficio + license) · logo · photography
├── docs/                 English documentation
├── examples/             Live showcase (static HTML)
├── scripts/              Zero-dependency build scripts
└── dist/                 Generated (gitignored)
```

## License

The design system's **code** is [MIT](LICENSE). Fonts are licensed separately — see
[`docs/fonts-and-licensing.md`](docs/fonts-and-licensing.md).
