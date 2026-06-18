# Changelog

All notable changes to the Diametral Design System are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/), and the project
adheres to [Semantic Versioning](https://semver.org/) — see [docs/versioning.md](docs/versioning.md).

## [0.2.0] — 2026-06-18

A major, Clarity-inspired component expansion with full React integration.

### Added
- **Data grid** (`DataGrid`, `.ds-datagrid`) — sortable columns, per-column filters, row
  selection, expandable detail rows, column show/hide, pagination, and **lazy server-side
  loading** in paginated or infinite (“load more”) mode, with skeleton loading rows.
- **New components** (CSS + React + showcase page each): Card, Description list, Empty state,
  Skeleton, Alert, Spinner, Progress, Toast (+ `ToastProvider`/`useToast`), Checkbox, Radio
  (+ `RadioGroup`), Select, Textarea, Range, Input group, field validation (`FieldHint`),
  Breadcrumb, Pagination, Vertical nav, Stepper, Tooltip, Dropdown menu, Accordion, Popover,
  Avatar (+ `AvatarGroup`), Tag, Timeline, Tree view, and Button variants (sizes, icon-only,
  loading, block, button group, split button).
- `Button` React component gained `size`, `loading`, and `block` props.
- New tokens: `--ds-z-popover`, `--ds-z-toast`.
- **More components**: Drawer (off-canvas), Command palette (⌘K), Sparkline, Bar chart, Stat
  card, Rating, Date range picker, Color picker, Code block, and Kbd.
- Showcase navigation reorganized into Actions / Forms / Data display / Feedback /
  Navigation / Overlays / Platform groups; new live React data-grid demo.

### Changed
- The React entry (`react/index.js`) now re-exports the full extended library from
  `react/components/*`.

[0.2.0]: #020--2026-06-18

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
