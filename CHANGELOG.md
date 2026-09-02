# Changelog

All notable changes to the Diametral Design System are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/), and the project
adheres to [Semantic Versioning](https://semver.org/) — see [docs/versioning.md](docs/versioning.md).

## [1.0.0-beta.3] — 2026-09-02

Net-new form controls and primitives. Fifteen components, three of which replace a
symbol this package already exported, and two more that ship a stylesheet with no
React binding.
Published on the `next` dist-tag — `latest` stays at 0.11.0 for the whole migration.

### Added
- **Ten net-new components:** `Toggle`, `Meter` (5 parts), `RelativeTime`,
  `Editable`, `PhoneInput`, `FieldArray` (5 parts), `Label`, `Form`,
  `Collapsible` (3 parts) and `DirectionProvider`. `Toggle`, `Meter` and `Form`
  arrived through alias withdrawals: no incumbent renders a standalone
  two-state button, a `role="meter"` track, or a form root with a validation
  context.
- **Two stylesheet-only components:** `carousel` and `input-otp`. Their
  bindings wrapped `embla-carousel-react` and `input-otp`, and neither
  dependency is acquired — in both cases the dependency *is* the component
  (drag and snap; the hidden-input trick that makes a row of boxes behave like
  one field), so the `.ds-carousel-*` and `.ds-input-otp-*` classes are the
  whole contract. Same arrangement `resizable` and `message-scroller` landed
  under in beta.2: `exports: []`, no import line on the page, and one demo that
  is the markup a binding has to produce.
- `useControllableValue` — the controlled/uncontrolled pattern as one hook,
  which `Editable` and `PhoneInput` both need. `Rating` hand-rolled the same thing
  and is a held component, so it is left alone.
- `.ds-button--xs` and `.ds-button--icon.ds-button--xs` — the 24px square
  `IconButton`'s new `icon-xs` size needs, which `Editable` and `FieldArray`
  are what asked for.
- **Six modifier classes**, each one a resolved dedupe exception:
  `.ds-carousel-item--half` / `--third`, `.ds-field-array-item--stacked` /
  `--stretch`, `.ds-field-array-item-content--grid` and `.ds-wordmark--lg`.

### Changed
- **`ButtonGroup` is replaced.** Its four-rule block leaves `button-extras.css`
  for a `components/button-group.css` that adds a text cell, a separator and
  `[data-orientation="vertical"]`, and collapses the shared edge by *removing*
  the losing border rather than overlapping members with `margin-left: -1px` —
  identical in LTR, correct in RTL. The class name and the published markup are
  unchanged: every selector matches both the new parts' `data-slot` and this
  package's own `.ds-button`, `.ds-input` and `.ds-select`, so the hand-written
  groups in `examples/` and `docs/components.md` keep joining.
- **`Wordmark` gets the produced lockups.** 0.x drew the brand's three elements
  as primitives — a circle, a square and a diagonal line. What lands is the
  finished artwork: the typographic wordmark, and the monogram that sets it
  inside the symbol, both as `currentColor` paths, so ink colour recolours them
  and they invert with the theme for free. `assets/logo/diametral-mark.svg`
  still holds the geometric mark and has **not** been re-cut to match — the
  React binding and that file now draw different marks, which is a brand-asset
  decision rather than a code one. `name` and
  `sub` are the one part of the incumbent this does **not** replace; see
  **Migration**.
- **`IconButton` moves and gains sizes.** Out of `ButtonExtras.tsx` into its own
  `icon-button.tsx`, with the source's four square size spellings (`icon`,
  `icon-xs`, `icon-sm`, `icon-lg`) accepted alongside the bare `sm` and `lg`
  this package already shipped. The required `label` — which the source's own
  file calls "the whole component" — was already required on both sides; the
  react-ledger's "incumbent is a class-applier" premise does not hold here, in
  the same way batch-plan §1.1 found for `stat-card`. Reported rather than
  silently flipped.
- **`.ds-label` merges into an occupied namespace.** The class was already
  defined in `base/typography.css` as the charte's signature small-caps
  treatment, and the ledgers read `label` as a clean addition because they
  scanned `css/components/`. The incumbent's weight, tracking and colour are a
  published contract and stay exactly as they are; `components/label.css` adds
  only the flex row, `user-select: none` and the two state overrides.
- **Six dedupe exceptions are resolved, not carried** — matching the plan's
  count, and two of them in TSX rather than CSS. `field-array`'s two
  (`flex items-center`, `flex`), `carousel`'s `basis-full`, `wordmark`'s svg
  sizing, `phone-input`'s two-sided one, and `button-group.tsx`'s — which was
  already paid, since beta.2 landed `.ds-separator--auto` for exactly this when
  `separator` arrived early for `item`.
- `class-variance-authority` still is not acquired (ADR 0001). The five
  components that used it declare the same cva-shaped block through
  `react/lib/variants.ts`.
- `.ds-wordmark` and its `__mark` / `__name` / `__sub` parts move from
  `app-bar.css` to `components/wordmark.css`, verbatim and with no visual
  change.

### Fixed
- **A `@layer` bargain that no longer exists.** `label.css`'s opening comment
  explained why three of its declarations sat below Tailwind's
  `@layer utilities` so a call site could override the label's voice. With no
  Tailwind and no layers the block merges into source order — but the intent
  survives, because it was never about layers: the two overrides that mattered
  are real rules winning on specificity, as they always did.
- **Two selectors keyed to marker classes nothing applies.** `label.css` read
  Tailwind's `.peer` and `.group`, so both rules would have landed inert — the
  same defect beta.2 found in `item.css`. They read the real state instead:
  `:disabled` on the sibling control and the `data-slot` a checkbox, radio or
  switch carries.
- **`.dark`-only rules that never painted**, in `toggle.css` and
  `input-otp.css`: this system's dark theme also answers to
  `[data-theme="dark"]`, which is what the docs site sets. Both were softened
  alpha mixes of a colour the rule above already sets, so the solid 1px rule
  carries the state on both themes rather than the pair being duplicated.
- **Three more `svg:not([class*="size-"])` escape hatches** removed, from
  `toggle`, `button-group` and `input-otp`, plus `:not([class*="w-"])` on
  `button-group`'s select trigger. There is no Tailwind utility to escape, and
  each negation silently skipped any element whose class merely contained the
  fragment.
- **A meter bar reading a text token.** The source's six tone keys read the
  `--ds-*-ink` family — the shade tuned for small text on a tint — and only four
  of the six exist here. They read `--ds-*-solid`, the family tuned for fills,
  which is what a bar with nothing written on it wants and which has all six.
- Focus rings and invalid glows across `toggle` and `input-otp`: the charte
  focuses with a 2px `outline` on `--ds-focus-ring` and separates by a 1px rule,
  not a colour ring in `box-shadow`.
- `prefers-reduced-motion` branches for the OTP caret blink, the meter's value
  transition and the editable pencil's fade.

### Migration
- **`Wordmark`'s `name` and `sub` survive**, and are the only part of the
  incumbent this batch keeps: the source's Wordmark is the mark alone, while
  `ConsoleLayout`, the Vite starter and `docs/migration.md`'s 0.x class table
  all read them, and `.ds-wordmark__name` / `__sub` are a published contract.
  Dropping them would be a regression rather than an absorption. They no longer
  *default*, though — a bare `<Wordmark />` is now the lockup alone where it
  used to print the word "Diametral" — and a name beside the mark wants
  `variant="square"`, since the horizontal lockup already spells it.
  `ConsoleLayout`'s `brand={{ name, sub }}` does that for you.
- Four rows in [docs/migration/renames.json](docs/migration/renames.json), for
  the three replaced applier symbols plus the `wordmark.css` file move.
- Three re-wirings are recorded as notes rather than rows. `Editable`,
  `FieldArray` and `IconButton` compose onto this repo's `Button` and
  `IconButton` until batch 7 supplies the source's — which makes `Editable`'s
  three affordances carry a required accessible name they did not have.
  `PhoneInput`'s five-part Base UI select collapses onto the native `Select`,
  which is also what dissolves this batch's largest dedupe exception: with
  nothing literal on either side, the overrides win on specificity instead of
  through a merge pass.

## [1.0.0-beta.2] — 2026-09-02

The content and media family. Fifteen net-new components, all in a clean namespace, and
the first two that ship a stylesheet with no React binding at all.
Published on the `next` dist-tag — `latest` stays at 0.11.0 for the whole migration.

### Added
- **Thirteen net-new components with bindings:** `Attachment` (9 parts), `Item` (10),
  `Bubble` (4), `Message` (6), `Toc` (5), `ThemeSwitcher`, `Marker` (3), `ScrollArea` (2),
  `Separator`, `Snippet`, `QrCode`, `AspectRatio` and `Masonry`. Every `.ds-*` class is a
  new name — nothing in 0.11 is renamed or replaced.
- **Two stylesheet-only components:** `resizable` and `message-scroller`. Their bindings
  wrapped `react-resizable-panels` and `@shadcn/react`, and neither dependency is
  acquired, so the `.ds-resizable-*` and `.ds-message-scroller-*` classes are the whole
  contract. Their docs pages print no import line and say why.
- `CodeBlockCopyButton` — the copy affordance extracted out of `CodeBlock`, so `Snippet`
  composes it instead of duplicating the clipboard fallback. `CodeBlock`'s own props and
  markup are unchanged.
- `QrCode` brings a hand-rolled ISO/IEC 18004 byte-mode encoder (`react/lib/qr-encode.ts`)
  — versions 1–10, all four correction levels, no dependency, no network, no canvas.

### Changed
- **`class-variance-authority` still is not acquired** (ADR 0001, restated). The four
  absorbed components that used it declare the same cva-shaped block through
  `react/lib/variants.ts`, which the docs site's build-time playground extractor now reads
  as well as `cva()` — so no batch has to restate its variant axes in `playgrounds.ts`.
- `Segmented`, `IconButton`, `CodeBlock` and Base UI's `Menu` take over from four held or
  not-yet-landed source components. See **Migration** below.
- **Eight dedupe exceptions are resolved, not carried.** Each was a Tailwind literal left
  in place upstream so `tailwind-merge` could dedupe it against a consumer override; with
  no Tailwind here each becomes a real declaration plus a modifier for the override:
  `.ds-toc--static`, `.ds-toc-label--tight`, `.ds-toc-list--tight`,
  `.ds-toc-link--current`, `.ds-bubble-group--loose`,
  `.ds-message-scroller-content--tight`, `.ds-separator--auto`, and `resizable`'s
  `h-full w-full`, which become the group's own defaults.

### Fixed
- **Three Tailwind classes were shipping with nothing behind them.** `scroll-fade-b`,
  `scroll-fade-x` and `scrollbar-none` came from shadcn's Tailwind plugin and Tailwind's
  core; with no Tailwind in this package they were inert class names. The two scroll fades
  are real `mask-image` gradients now and the hidden scrollbar is real CSS.
- **A dead animation.** `attachment.css` ran `animation: shimmer …` on the title while a
  file uploads, and no `shimmer` keyframe exists anywhere in the source — the documented
  behaviour never happened. It is a real opacity pulse now, with a
  `prefers-reduced-motion` branch.
- **Six `svg:not([class*="size-"])` escape hatches** removed from `attachment`, `item` and
  `marker`: nothing to escape without Tailwind, and they silently skipped any icon whose
  class happened to contain `size-`.
- **`Bubble`'s ghost and destructive dark states** were keyed to `.dark` alone; this
  system's dark theme also answers to `[data-theme="dark"]`, which is what the docs site
  sets, so they never painted. Same defect batch 1 fixed in `navigation-menu`.
- **A selector that matched nothing.** `item.css` scoped a zero-padding rule to
  `[data-slot="dropdown-menu-content"]`, the source's own held popup; it reads `.ds-menu`,
  this repo's menu surface, instead.
- **A white-on-white bubble in dark mode.** `Bubble`'s default variant reads `--ds-bg` for
  its text rather than `--ds-on-accent`, which is pinned to white and is not flipped by
  the dark theme.
- Drop shadows on `.ds-bubble-reactions` and the source's `ring`-plus-glow focus styles
  across all fifteen stylesheets: the charte separates by 1px rule and focuses with a 2px
  `outline` on `--ds-focus-ring`.

### Migration
- **No renames.** Every class and export in this release is additive; see
  [docs/migration/from-0.11.md](docs/migration/from-0.11.md).
- Four re-wirings are recorded as notes rather than rows in
  `docs/migration/renames.json`. `AttachmentAction` and `ThemeSwitcher`'s `cycle` variant
  compose onto `IconButton` until batch 7 supplies the source's `Button` — `IconButton`
  requires `label`, so an icon-only action now carries an accessible name the source's own
  ghost button never had. `ThemeSwitcher`'s `segmented` variant is this repo's
  `Segmented`: its cells show a visible word beside the glyph, and the source's sliding
  indicator does not survive the toggle cells it was pitched against. Its `dropdown`
  variant is Base UI's `Menu` wearing `.ds-menu`, the same re-wiring batch 1's `menubar`
  made. `Snippet` composes `CodeBlockCopyButton`.
- `separator` ships here rather than in batch 3: `item.tsx` imports `Separator`, and this
  repo had no `Separator` and no `.ds-separator` rule to re-compose onto. Landing both
  together dissolves the import instead of re-wiring it twice.

## [1.0.0-beta.1] — 2026-09-02

The first absorption beta: `@diametral/ui`'s overlay and menu family enters the system.
Published on the `next` dist-tag — `latest` stays at 0.11.0 for the whole migration.

### Added
- **Six net-new components**, all in a clean namespace: `ContextMenu` (15 parts),
  `Menubar` (16), `Autocomplete` (12), `NavigationMenu` (9 + `navigationMenuTriggerStyle`),
  `HoverCard` (3) and `SpeedDial` (2). Each ships its `.ds-*` stylesheet, so any binding
  can render the look; the keyboard and focus contract is React-only, and each component's
  [binding tier](docs/components.md) says so.
- `--ds-*` classes for all six, bundled into `css/diametral.css`.

### Changed
- **`@base-ui/react` and `@phosphor-icons/react` are now runtime `dependencies` of the
  React layer** ([ADR 0001](docs/adr/0001-base-ui-as-a-substrate.md)). The
  zero-dependency promise is restated, not dropped: CSS, tokens and Web Components still
  import nothing, and a release-blocking `layer-purity` check keeps that true.
- **`/docs/context-menu` documents the real `ContextMenu`.** It previously documented
  `Dropdown` and the absence of a right-click menu. Nothing a consumer imports changed
  name — `Dropdown` is unmoved.
- The seven `z-index: 50` values the overlay family arrived with are `var(--ds-z-popover)`.

### Fixed
- **The absorbed popups no longer paint drop shadows.** They arrived with a 10%-ink ring
  plus two shadow layers; the charte separates by 1px rule, so each is a bordered flat
  surface, and their focus rings use this system's `outline` convention.
- **A submenu's border ring.** The source re-applied a `shadow-md` class on
  `ContextMenuSubContent` on top of the popup's own `box-shadow`; as a single-class
  override it *replaced* it, dropping the 1px ring. The class is deleted.
- **`NavigationMenu`'s destructive-row dark state.** It was keyed to `.dark` alone, and
  this system's dark theme also answers to `[data-theme="dark"]` — which is what the docs
  site uses, so the rule never painted.

### Migration
- No renames. Every class and export in this release is additive; see
  [docs/migration/from-0.11.md](docs/migration/from-0.11.md).
- Two re-wirings are recorded as notes rather than rows in
  `docs/migration/renames.json`: `SpeedDial` composes onto `IconButton` and
  `Autocomplete` onto `InputGroup` until batch 7 supplies the source symbols. `tone` on
  `SpeedDial` therefore takes `primary` or `danger`, not the source's eight tones.

## [0.11.0] — 2026-06-23

### Fixed
- **Light/Dark/Sepia theme switcher now works out of the box.** `css/diametral.css`
  bundles `css/themes/dark.css` + `css/themes/sepia.css` (scoped to
  `[data-theme="dark"|"sepia"]`, so they stay inert until a theme is activated).
  Previously `ConsoleLayout`'s switcher set `data-theme` on `<html>` but the
  bundle shipped no matching rules, so switching had no visible effect.

### Changed
- **Title voice / fonts.** The `vite-react` starter now loads **Fraunces** next to
  Geist, so headings render in the intended free serif instead of falling back to
  Georgia. The **Keycloak login theme** likewise loads Fraunces, and its
  `--ds-serif` now prefers `Ufficio → Fraunces → Georgia` — matching the app's
  heading font across login and app.

## [0.10.0] — 2026-06-22

### Added
- **Reference for Claude / AI assistants**: a single self-contained
  [`docs/for-claude.md`](docs/for-claude.md) (principles, tokens, every component as copy-paste
  HTML, the grid system, a full example, and don'ts) plus a root [`llms.txt`](llms.txt) index — for
  use with claude.ai's design-systems feature. Verified by having a fresh assistant build a screen
  from the doc alone: 33 classes used, all real, rendered on-brand.

### Changed
- **Keycloak login theme**: added CSS for the special pages (TOTP setup, select-authenticator,
  recovery codes, OAuth grant). All 41 login + 13 email templates are inherited from the `keycloak`
  parent and styled; login, reset, register, update-password and TOTP-setup verified on Keycloak 25.

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
