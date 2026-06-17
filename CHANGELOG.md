# Changelog

All notable changes to the Diametral Design System are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/), and the project
adheres to [Semantic Versioning](https://semver.org/) — see [docs/versioning.md](docs/versioning.md).

## [0.1.0] — 2026-06-17

Initial extraction of the Diametral Design System from the `pricing_matrix` app and the
official brand charter.

### Added
- **Tokens** — three-tier `--ds-*` system in `css/tokens.css`, sourced from
  `tokens/tokens.json` (primitives → semantic → scale). Brand palette reconciled to the
  charter (accent = `#FF2A00`; the pre-charter `#ff5500` kept as `--ds-accent-legacy` /
  `--ds-warning`). The secondary green `--ds-vert` is sampled from the charter and flagged
  for confirmation.
- **CSS components** (`.ds-*`, framework-agnostic): button, switch, badge, tabs, field,
  chip, banner, callout, panel, status panel (signature), segmented, table, modal,
  section heading, app bar. De-domained from the source app.
- **Web Components** — light-DOM custom elements (`<ds-button>`, `<ds-badge>`,
  `<ds-callout>`, `<ds-panel>`, `<ds-section-heading>`, `<ds-status>`, `<ds-switch>`,
  `<ds-tabs>`, `<ds-segmented>`, `<ds-modal>`).
- **React components** — real, typed React components in `react/` (`Button`, `Input`,
  `Field`, `Badge`, `Chip`, `Banner`, `Callout`, `Panel`, `SectionHeading`, `Status`,
  `Metric`, `Switch`, `Tabs`, `Segmented`, `Modal`, `Wordmark`). Plain-JS ESM (no build),
  with `index.d.ts` types and optional `react`/`react-dom` peers. Live demo at
  `examples/react.html`.
- **Multi-stack artifacts** — `npm run build:tokens` generates `dist/tokens.css`,
  `dist/tokens.scss`, and `dist/tailwind-preset.cjs`.
- **Themes** — opt-in `css/themes/dark.css` (supports `[data-theme="dark"]`, `.dark`, and
  `:root.dark-theme`) and a `_brand-example.css`.
- **Showcase** — buildless multi-page documentation in `examples/` that dogfoods the system.
- **Docs** — English documentation in `docs/`, plus `README`, `CONTRIBUTING`, this changelog.
- **Compat** — opt-in `css/compat/legacy-aliases.css` for incremental migration off the
  original stylesheet.

[0.1.0]: #010--2026-06-17
