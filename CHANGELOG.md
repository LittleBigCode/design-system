# Changelog

All notable changes to the Diametral Design System are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/), and the project
adheres to [Semantic Versioning](https://semver.org/) — see [docs/versioning.md](docs/versioning.md).

## [0.9.0] — 2026-06-22

### Added
- **Keycloak theme** ([`keycloak/`](keycloak/)): a drop-in theme branding the **login** flow
  (sign-in, reset password, OTP, register, update password, verify email, error/info) via one
  stylesheet on the classic `keycloak` parent, and the **transactional emails** by overriding the
  shared HTML shell (`email/html/template.ftl`). Includes a `docker-compose.yml` to try it and a
  README covering install + realm selection. Ships in the npm package under `keycloak/`.

## [0.8.1] — 2026-06-19

### Fixed
- **Streamlit guide**: inject the **flattened `dist/diametral.css`** bundle (fetched + inlined),
  not `css/diametral.css` (whose relative `@import`s 404 once inlined) nor a bare `<link>` (Streamlit
  can strip it). Verified end-to-end in a Docker Streamlit app.

### Added
- A runnable **Streamlit example** at [`examples/streamlit/`](examples/streamlit/) (app +
  `.streamlit/config.toml` + Dockerfile).

## [0.8.0] — 2026-06-19

### Added
- More **email templates** — `inviteEmail`, `digestEmail`, `alertEmail` — plus a
  `kitchenSinkEmail` reference that exercises every block, and new email blocks
  `callout` / `list` / `statBand` / `quote` / `card`.
- A **Streamlit (Python) guide** ([`docs/streamlit.md`](docs/streamlit.md)): theme config + CSS
  injection + rendering `.ds-*` blocks via `st.markdown`, with caveats for native widgets, charts,
  the React components and emails.

## [0.7.0] — 2026-06-19

### Added
- **Email kit** (`@diametral/design-system/emails`): dependency-free, **email-safe** builders
  (table layout + inline styles + system-font fallbacks, flat / 1px / no-radius) for on-brand
  transactional emails — a shared `layout()` + block helpers (`button`, `heading`, `kicker`,
  `codeBox`, `row`…) and ready-made `welcomeEmail` / `passwordResetEmail` / `otpEmail` /
  `notificationEmail` / `invoiceEmail`. Live previews at `examples/components/email.html`; docs in
  [`docs/emails.md`](docs/emails.md).

## [0.6.0] — 2026-06-19

### Added
- **Motion** (restrained, honors `prefers-reduced-motion`): a thin indeterminate top **load bar**
  and a content **fade** on navigation in `<ConsoleLayout>` (new `loading` prop); a **`.ds-pulse`**
  "live" dot; a StatCard **count-up** (`animate`); and a Sparkline **draw-in** (`animate`).
- The demo now loads real data from a static-JSON **API** ([`examples/demo/api/`](examples/demo/api/)):
  the Overview chart via `useResource` (Skeleton → chart), and the Invoices table via a JSON-backed
  `loadPage` (skeleton rows → data). Documented in [`docs/data.md`](docs/data.md).

## [0.5.1] — 2026-06-19

### Fixed
- `Select` now accepts bare-string `options` (e.g. `["Director","Manager"]`), normalizing them to
  `{ value, label }` like `MultiSelect` — previously bare strings rendered empty `<option>`s.

### Changed
- The demo **Settings** page is now a forms showcase: regex validation (email / username),
  cross-field password confirmation, color picker, date picker and a multi-select dropdown — all
  built on `useForm` + `<FormField>`.

## [0.5.0] — 2026-06-19

### Added
- **Icons**: a Lucide-compatible line-icon set (~34 icons) with a React `<Icon name>`, a
  `<ds-icon>` web component, `.ds-icon` CSS, and a showcase page. Any 24×24 stroke-2 SVG (e.g.
  Lucide) drops in unchanged.
- **Figma tokens**: `scripts/build-figma.mjs` (wired into `npm run build`) emits
  `dist/figma-tokens.json` in Tokens Studio format for designer handoff. See `docs/figma.md`.
- **Accessibility tests**: `tests/a11y.spec.js` (axe via `@axe-core/playwright`) gates key pages on
  no critical/serious violations, with a `a11y.yml` CI workflow and a `test:a11y` script.

### Fixed
- Accessibility issues surfaced by the new axe gate: low-contrast nav labels, unlabeled form
  controls, and ARIA on the calendar grid, popover, command palette, progress bar and scrollable
  code blocks.

## [0.4.0] — 2026-06-18

App-acceleration kit — everything a team needs to stand up an app fast.

### Added
- **ConsoleLayout** (`<ConsoleLayout>` + `.ds-console`): turnkey app chrome — app bar, data-driven
  grouped sidebar nav, optional ⌘K command palette, and an optional Light/Dark/Sepia theme switcher
  around your page content. The demo app is rebuilt on it.
- **Form layer**: `useForm` hook (values/errors/touched/validation/submit) + `<FormField>` wired to
  the DS `Field`/`FieldHint`. See `docs/forms.md`.
- **Data layer**: `useResource(fetcher, deps)` for loading/empty/error/data state, and
  `restLoadPage(baseUrl)` — a `<DataGrid loadPage>` factory for REST endpoints. See `docs/data.md`.
- **Theme generator**: `scripts/make-theme.mjs --name --accent …` writes a `[data-theme]` override
  file; an example `css/themes/ocean.css` ships. See `docs/theme-generator.md`.
- **Vite + React + TS starter** (`starters/vite-react/`): clone-and-go app pre-wired with the DS +
  ConsoleLayout + routing + example pages (`npm run build` verified).
- **Shared DX configs** (`configs/`): flat ESLint, Prettier, base tsconfig, and VS Code snippets,
  consumable via `@diametral/design-system/configs/*`.
- **Recipes** (`docs/recipes.md`): end-to-end page patterns (app shell, CRUD, dashboard, auth,
  loading/empty/error) and a Console layout showcase page.
- A **theme switcher** in the demo app bar (Light / Dark / Sepia).

### Changed
- Exports add `./react/*` (deep imports) and `./configs/*`.

## [0.3.0] — 2026-06-18

### Added
- **PageHeader** component (`.ds-page-header` + React `<PageHeader>`): breadcrumb + title + actions
  + optional tabs row.
- **Blocks** — a new showcase area of composed, copy-paste sections: App chrome, Auth, Marketing
  (on the visible grid system), and Data & detail (`examples/blocks/`).

### Changed
- The live demo app (`examples/demo.html`) is refactored into ES modules (`examples/demo/`) and
  expanded to **14 views**: Overview, Projects (+ project detail with stepper, burn-down, risks),
  Board, Reports (funnel/trend/pie/gauge), Invoices, Candidates → CV, Team → profile, Training,
  Calendar, Knowledge base, Files, Inbox, Settings — with a ⌘K command palette and one consistent
  content width across every view.

## [0.2.1] — 2026-06-18

### Changed
- Published to the **public npm registry** as `@diametral/design-system` (scope renamed from
  `@littlebigcode`). Installs with no registry config and no token.
- The published package is lean and license-safe: ships the free font CSS + logo SVGs + docs, and
  **excludes** the commercial Ufficio font binary, the photography, and raster brand PNGs
  (~193 kB vs 7.3 MB). The GitHub Packages workflow was removed; CI publishes to public npm on a
  `v*` tag / GitHub Release via the `publish-npm.yml` workflow (NPM_TOKEN environment secret).
- Installation docs lead with the frictionless public-npm install.

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
- **Charts**: a dedicated categorical palette (`--ds-chart-1…6`, legible & well-spaced) now drives
  series colors (fixing the near-identical accent/warning clash); added Pie, Gauge, and Stacked-bar
  charts with `<title>` hover tooltips.
- **Visual regression tests**: a Playwright pipeline (`playwright.config.js`, `tests/visual.spec.js`,
  a GitHub Actions workflow) with `npm run test:visual` / `test:visual:update`.
- **Docs**: a full installation & integration guide (`docs/installation.md`) for npm/CDN, Vite,
  Next.js, CRA, Angular, Vue, Tailwind, and import-map prototyping — also as an in-showcase
  page (`examples/installation.html`).
- **Live React example apps** (shadcn-style, buildless) under `examples/demos/`: a Dashboard, an
  Inbox/mail app, a tabbed Forms/settings page, and a Login screen. The Charts showcase now mounts
  the real React chart components live (interactive hover tooltips); axis labels no longer upscale
  and point markers dropped the white halo.
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
