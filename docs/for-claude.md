# Diametral Design System — reference for Claude

A guide for generating **on-brand Diametral UI**: principles, tokens, and the
most-used `.ds-*` classes as real copy-paste HTML backed by `--ds-*` CSS
variables, plus where to find the rest. No build step. It is a starting point,
not the catalogue — the system ships over 900 `.ds-*` selectors and this file
names about 80, so the routing tables below matter as much as the snippets.

## Pick your layer first

| Your project | Use | Read |
|---|---|---|
| React | `@diametral/design-system/react` — the full typed component set | `docs/react.md`, `docs/recipes.md`, then this file for tokens and look |
| Anything else (static HTML, Vue, Angular, Django, Streamlit, email) | `.ds-*` classes | this file |

The React layer is strictly larger. Interactive components ship their behaviour
there. In the class layer the CSS is only the skin — you wire the behaviour
yourself, and if you don't, the thing renders and does nothing. The five where
that gap bites hardest, with the real hook to drive, not "add JavaScript":

| Component | What you must wire in the class layer |
|---|---|
| Sidebar | Toggle `data-state="collapsed"` on `.ds-sidebar` (with `data-collapsible="icon"` or `"offcanvas"`) from the trigger, the rail and a Cmd/Ctrl+B keydown; below the mobile breakpoint swap the collapse for sheet behaviour — focus trap, overlay, Escape. |
| Select | Toggle `aria-expanded` on the trigger and move `data-highlighted` with arrows/Home/End/typeahead without committing; commit on Enter/Space/click, dismiss on Escape or outside click without committing. |
| Combobox | Filter `.ds-combobox-item` rows from the input as it is typed, move `data-highlighted` with arrows, commit and close on Enter; `multiple` also tracks an array and renders one `.ds-combobox-chip` per value. |
| Drawer | Open/close plus the swipe gesture — drag along the swipe axis, snap to each snap point on release — and a focus trap inside the popup while open. |
| Data table | Cycle a sortable header none→asc→desc, derive the select-all checkbox's checked/indeterminate state from its rows, toggle `aria-expanded` on each row's disclosure, and commit inline edits on blur/Enter. |

Every component page carries its own wiring note in full, e.g.
https://littlebigcode.github.io/design-system/docs/sidebar

## Setup — always include this

```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/@diametral/design-system/dist/diametral.css">
```

(React: `import "@diametral/design-system/css/diametral.css"` and
`import { Button, Card, DataTable } from "@diametral/design-system/react"`.)

## Principles — the look (follow strictly)

- **Flat.** NO `border-radius`, NO `box-shadow`, NO gradients. Ever.
- **1px lines.** Structure is shown with `1px solid var(--ds-rule)` borders.
- **Surfaces:** white `--ds-surface` on whitesmoke `--ds-bg`. Ink is black `--ds-ink`.
- **Type:** headings use the title font (serif/Ufficio) via `.ds-title`; body is Geist.
  Labels are UPPERCASE, letter-spaced `0.08em`, faint (`.ds-label` / `.ds-kicker`).
- **Accent** `--ds-accent` is for emphasis only: links, a key edge/tick, a small
  badge. The **primary action is solid black** (`.ds-button--primary`), not accent.
  There is no fixed accent value — it is themeable, so reference the token, never a hex.
- **Numbers:** tabular — wrap figures in `.ds-numeric`.
- Use `.ds-*` classes as-is. Don't invent class names or override them with ad-hoc CSS;
  for layout, use plain inline `style` (fl/grid/gap) around `.ds-*` elements.

## Before you build — start from the composition that exists

Do not assemble a screen out of the primitives below. Find the row that matches
what you are building, read that source, and start from it.

<!-- blocks-table:start -->

| Building | Copy | Live |
|---|---|---|
| Five typed events with an icon indicator, a time and a detail line. | `blocks/activity/activity-01.tsx` | /blocks/activity |
| Search header, badged menu with hover actions, account row in the footer. | `blocks/app-shell/app-shell-01.tsx` | /blocks/app-shell |
| A danger-zone card whose button opens a two-action confirmation. | `blocks/confirm/confirm-01.tsx` | /blocks/confirm |
| Sidebar nav, page header, three KPI cards and a sparkline table. | `blocks/dashboard/dashboard-01.tsx` | /blocks/dashboard |
| A wide body card next to a 320px description-list sidebar. | `blocks/detail/detail-01.tsx` | /blocks/detail |
| Icon, title, explanation and a single primary action, inside a card. | `blocks/empty/empty-01.tsx` | /blocks/empty |
| 404 — the empty-state pattern scaled up and centred on the page. | `blocks/error/error-01.tsx` | /blocks/error |
| Checkbox statuses and tag disciplines beside an item list. | `blocks/faceted-filter/faceted-filter-01.tsx` | /blocks/faceted-filter |
| Three ruled columns, each led by a ticked grid label. | `blocks/features/features-01.tsx` | /blocks/features |
| Removable tags and a result count on the left, selects and clear on the right. | `blocks/filter-bar/filter-bar-01.tsx` | /blocks/filter-bar |
| A registration-marked CTA over an accent rule and four link columns. | `blocks/footer/footer-01.tsx` | /blocks/footer |
| One email field, a full-width send, and the way back to sign in. | `blocks/forgot-password/forgot-password-01.tsx` | /blocks/forgot-password |
| A six-column gridlines band with a kicker, title, lede and two actions. | `blocks/hero/hero-01.tsx` | /blocks/hero |
| The card alone — drop it into a layout you already have. | `blocks/login/login-01.tsx` | /blocks/login |
| The whole screen: the same form centred on the brand background. | `blocks/login/login-02.tsx` | /blocks/login |
| Six OTP slots with the verify action disabled until the code is complete. | `blocks/otp/otp-01.tsx` | /blocks/otp |
| Breadcrumb, title with actions, and a tab strip flush to the rule. | `blocks/page-header/page-header-01.tsx` | /blocks/page-header |
| Three columns with the middle one framed in accent and badged. | `blocks/pricing/pricing-01.tsx` | /blocks/pricing |
| Flat — four rows, no groups. Right up to about six destinations. | `blocks/sidebar/sidebar-01.tsx` | /blocks/sidebar |
| Grouped and labelled, with a per-group action and a rule between. | `blocks/sidebar/sidebar-02.tsx` | /blocks/sidebar |
| Nested: collapsible parents over sub-rows, plus a count badge. | `blocks/sidebar/sidebar-03.tsx` | /blocks/sidebar |
| Name, email and password over a full-width create action. | `blocks/signup/signup-01.tsx` | /blocks/signup |
| Bare — four cells sitting directly under application chrome. | `blocks/stat-band/stat-band-01.tsx` | /blocks/stat-band |
| The marketing version: the same grid, framed and led by a kicker. | `blocks/stat-band/stat-band-02.tsx` | /blocks/stat-band |
| Search on the left, a separator, and three actions on the right. | `blocks/toolbar/toolbar-01.tsx` | /blocks/toolbar |

<!-- blocks-table:end -->

React screen wiring — app shell, CRUD list+detail, dashboard, auth gate — is in
`docs/recipes.md`.

Every path in the table ships in the package: copy the file and own it. The
table is written by `npm run build` from `site/src/registry/blocks.ts` — edit
the registry, not this file. The same rows are in `docs/agent-index.json` under
`blocks`.


A primitive is a fallback. If a block already contains the thing you are
building, copying it and changing the content is the correct move, not a
shortcut.

## Tokens (use these, not raw hex)

| Token | Role |
|---|---|
| `--ds-ink` `#161616` / `--ds-ink-soft` / `--ds-ink-faint` | text: primary / secondary / muted |
| `--ds-bg` `#f4f4f5` / `--ds-bg-alt` / `--ds-surface` `#fff` | page / alt / card surface |
| `--ds-rule` `#e5e5e5` / `--ds-rule-soft` | 1px borders |
| `--ds-accent` / `--ds-accent-ink` | accent fill / accent text on light (themeable — no fixed value) |
| `--ds-success` `--ds-warning` `--ds-danger` `--ds-info` | status |
| `--ds-space-*`, `--ds-text-*`, `--ds-radius-none` (=0) | scale |

## Typography

```html
<p class="ds-kicker">Section</p>                     <!-- uppercase accent tag -->
<h1 class="ds-title ds-title--xl">Page title</h1>     <!-- serif display -->
<h2 class="ds-title ds-title--md">Subtitle</h2>
<p class="ds-label">Field label</p>                   <!-- uppercase faint label -->
<span class="ds-numeric">€4,512.60</span>             <!-- tabular figures -->
```

## Components (copy-paste)

### Buttons — primary is solid black
```html
<button class="ds-button ds-button--primary">Save</button>
<button class="ds-button">Cancel</button>
<button class="ds-button ds-button--danger">Delete</button>
<button class="ds-button ds-button--lg ds-button--block">Full width</button>
```

### Card
```html
<div class="ds-card">
  <div class="ds-card__header"><span class="ds-card__title">Project Atlas</span></div>
  <div class="ds-card__body">Flat card — 1px border, no radius, no shadow.</div>
</div>
```

### Tags & badges
```html
<span class="ds-tag">data</span>
<span class="ds-tag ds-tag--success">Run</span>
<span class="ds-tag ds-tag--warning">At risk</span>
<span class="ds-tag ds-tag--danger">Blocked</span>
<span class="ds-badge ds-badge--accent">Production</span>
```

### Callouts (status banners — left accent rule)
```html
<div class="ds-callout ds-callout--info"><div class="ds-callout__title">Heads-up</div>Margins drive the delegation level.</div>
<div class="ds-callout ds-callout--success">Saved.</div>
<div class="ds-callout ds-callout--warning">Below the 20% floor.</div>
<div class="ds-callout ds-callout--danger">Action required.</div>
```

### Forms
```html
<div class="ds-field">
  <label class="ds-label" for="email">Email</label>
  <input class="ds-input" id="email" type="email" placeholder="you@example.com">
</div>
<div class="ds-field">
  <label class="ds-label" for="role">Role</label>
  <select class="ds-select" id="role"><option>Director</option><option>Manager</option></select>
</div>
<label class="ds-input-row"><span>Email digests</span><span class="ds-switch"><input type="checkbox" checked><span class="ds-switch__track"></span></span></label>
```

### Table
```html
<table class="ds-table">
  <thead><tr><th>Project</th><th>Stage</th><th class="ds-numeric">Margin</th></tr></thead>
  <tbody>
    <tr><td>Atlas</td><td><span class="ds-tag ds-tag--success">Run</span></td><td class="ds-numeric">24.6%</td></tr>
  </tbody>
</table>
```

### Avatar, progress, alert
```html
<span class="ds-avatar" data-size="sm"><span class="ds-avatar-fallback">CR</span></span>
<div class="ds-progress"><div class="ds-progress-track"><div class="ds-progress-indicator" style="width:62%"></div></div></div>
<div class="ds-alert ds-alert--danger">Couldn’t load data.</div>
```

### Icons (Phosphor, regular weight)
```html
<svg class="ds-icon" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>
```

## The visible grid system (a brand signature)

Diametral marks structure with *visible* lines. Use these for headers, stat bands,
and section layout:

```html
<!-- Stat band: ruled cells, accent-tick labels, big serif figures -->
<div class="ds-statgrid">
  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Revenue</div><div class="ds-statgrid__value">€4.5M</div></div>
  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Margin</div><div class="ds-statgrid__value">24.6%</div></div>
  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Projects</div><div class="ds-statgrid__value">86</div></div>
</div>

<!-- Ruled columns -->
<div class="ds-ruled">
  <div class="ds-ruled__col"><span class="ds-gridlabel">Design</span></div>
  <div class="ds-ruled__col"><span class="ds-gridlabel">Build</span></div>
</div>

<!-- A label with a leading accent tick -->
<span class="ds-gridlabel">Expertise</span>
```

## Page header
```html
<header class="ds-page-header">
  <div class="ds-page-header-heading">
    <div><h1 class="ds-page-header-title">Projects</h1><p class="ds-page-header-description">Delivery tracking</p></div>
    <div class="ds-page-header-actions"><button class="ds-button">Export</button><button class="ds-button ds-button--primary">New</button></div>
  </div>
</header>
```

## A full small screen (assembles the above)

```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/@diametral/design-system/dist/diametral.css">
<body style="background:var(--ds-bg);margin:0;">
  <main style="max-width:1100px;margin:0 auto;padding:32px;">
    <header class="ds-page-header"><div class="ds-page-header-heading">
      <div><p class="ds-kicker">Overview</p><h1 class="ds-page-header-title">Pricing matrix</h1></div>
      <div class="ds-page-header-actions"><button class="ds-button ds-button--primary">New rate</button></div>
    </div></header>
    <div class="ds-statgrid" style="margin:22px 0">
      <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Revenue</div><div class="ds-statgrid__value">€4.5M</div></div>
      <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Margin</div><div class="ds-statgrid__value">24.6%</div></div>
      <div class="ds-statgrid__cell"><div class="ds-statgrid__label">At-risk</div><div class="ds-statgrid__value">5.2%</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 320px;gap:16px;align-items:start;">
      <div class="ds-card"><div class="ds-card__header"><span class="ds-card__title">Projects</span></div>
        <div class="ds-card__body"><table class="ds-table">
          <thead><tr><th>Name</th><th>Stage</th><th class="ds-numeric">Margin</th></tr></thead>
          <tbody>
            <tr><td>Atlas</td><td><span class="ds-tag ds-tag--success">Run</span></td><td class="ds-numeric">24.6%</td></tr>
            <tr><td>Nova</td><td><span class="ds-tag ds-tag--warning">At risk</span></td><td class="ds-numeric">11.0%</td></tr>
          </tbody></table></div></div>
      <div class="ds-card"><div class="ds-card__body">
        <div class="ds-field"><label class="ds-label" for="q">Filter</label><input class="ds-input" id="q" placeholder="Search…"></div>
        <div class="ds-callout ds-callout--warning" style="margin-top:14px">One project below the floor.</div>
      </div></div>
    </div>
  </main>
</body>
```

## Composition rules

Prohibitions alone cap ambition — an agent that only knows what is forbidden
minimises surface area to stay safe, and ships eight flat rows where the system
has grouped, iconed, collapsible nav. So: the positive rules first. Every one is
already obeyed by a file in this repo, named beside it.

### Do

**Density**
- A nav over ~6 items groups. Every group gets a label *and* an icon.
  — `site/src/docs/docs-layout.tsx` (`CATEGORY_ICONS` is keyed off the category
  union, so a new category fails the typecheck rather than rendering iconless).
- A group is open when the reader is inside it. Never seed everything collapsed.
  — `docs-layout.tsx` `useSectionOpen`: the seed is `undefined`, not `false`, so
  a jump into a shut section still reveals the row that just became active.
- The handful of rows a reader needs *before* they know what they are looking
  for stay flat and always open — nothing top-level hides behind a chevron.
  — `docs-layout.tsx`, the first `SidebarGroup`.

**Structure**
- Every panel edge is a real 1px rule. `--ds-rule` for structure,
  `--ds-rule-soft` for subdivision inside an already-ruled box.
  — `site/src/docs/foundations/borders.tsx` (the two weights, and why there is
  no third: depth is drawn, not faked).
- Draw the structure rather than implying it with whitespace: `.ds-ruled` for
  ruled columns, `.ds-frame` / `.ds-frame--accent` for gutter rules,
  `.ds-gridlines` (set `--ds-grid-cols`) for a measured overlay, `.ds-marks` for
  registration ticks. — `site/src/docs/foundations/grid.tsx`.
- A stat row is one `.ds-statgrid` of `.ds-statgrid__cell`s, never three
  `.ds-card`s in a flex. — `blocks/stat-band/stat-band-01.tsx`.
- A page header is one `.ds-page-header` carrying breadcrumb, heading, actions
  and tabs — not four stacked `div`s.
  — `app-chrome.tsx`, "Page header".

**State**
- Exactly one row carries the active state, and it is derived from the current
  route, not stored. — `docs-layout.tsx` (`isActive={pathname === to}`);
  `css/components/sidebar.css` styles `[data-active]`.
- Counts live in `.ds-sidebar-menu-badge`, not in the label text. No badge means
  zero — the absence is the signal.
  — `docs-layout.tsx`, the example-count badge.

**Hierarchy**
- One `.ds-button--primary` per screen region, and it is last in its action
  group. — `app-chrome.tsx`: both the page header's
  `.ds-page-header-actions` and the toolbar's `.ds-toolbar-group` end on it.
- `.ds-kicker` above a title, never beside it. — every block and foundation
  page header in `site/src/docs/`, and the full-screen example above.

### Don't
- ❌ rounded corners, shadows, gradients, glassmorphism.
- ❌ accent-colored primary buttons (primary is **black**); accent is for links/emphasis.
- ❌ inventing `.ds-*` names or restyling existing ones — compose with inline layout instead.
- ❌ raw hex when a token exists.

The full component catalogue, live: https://littlebigcode.github.io/design-system/
