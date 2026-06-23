# Diametral Design System — reference for Claude

A single, self-contained guide for generating **on-brand Diametral UI**. Everything
here is real, copy-paste HTML using `.ds-*` classes backed by `--ds-*` CSS
variables. No build step.

## Setup — always include this

```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/@diametral/design-system/dist/diametral.css">
```

(React: `import "@diametral/design-system/css/diametral.css"` and
`import { Button, Card, DataGrid } from "@diametral/design-system/react"`.)

> **Full component index.** This guide covers the common components by hand. For
> the complete set — every `.ds-*` block with its `__` elements, `--` modifiers,
> web component, and React wrapper + props — read the generated machine-readable
> [`components.json`](../tokens/components.json) (package export
> `@diametral/design-system/components.json`).

## Principles — the look (follow strictly)

- **Flat.** NO `border-radius`, NO `box-shadow`, NO gradients. Ever.
- **1px lines.** Structure is shown with `1px solid var(--ds-rule)` borders.
- **Surfaces:** white `--ds-surface` on whitesmoke `--ds-bg`. Ink is black `--ds-ink`.
- **Type:** headings use the title font (serif/Ufficio) via `.ds-title`; body is Geist.
  Labels are UPPERCASE, letter-spaced `0.08em`, faint (`.ds-label` / `.ds-kicker`).
- **Accent** `--ds-accent` `#ff2a00` is for emphasis only: links, a key edge/tick, a
  small badge. The **primary action is solid black** (`.ds-button--primary`), not accent.
- **Numbers:** tabular — wrap figures in `.ds-numeric`.
- Use `.ds-*` classes as-is. Don't invent class names or override them with ad-hoc CSS;
  for layout, use plain inline `style` (fl/grid/gap) around `.ds-*` elements.

## Tokens (use these, not raw hex)

| Token | Role |
|---|---|
| `--ds-ink` `#161616` / `--ds-ink-soft` / `--ds-ink-faint` | text: primary / secondary / muted |
| `--ds-bg` `#f4f4f5` / `--ds-bg-alt` / `--ds-surface` `#fff` | page / alt / card surface |
| `--ds-rule` `#e5e5e5` / `--ds-rule-soft` | 1px borders |
| `--ds-accent` `#ff2a00` / `--ds-accent-ink` `#db2400` | accent fill / accent text on light |
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
<label class="ds-input-row"><span>Email digests</span><span class="ds-switch"><input type="checkbox" checked><span></span></span></label>
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
<span class="ds-avatar ds-avatar--sm">CR</span>
<div class="ds-progress"><div class="ds-progress__bar" style="width:62%"></div></div>
<div class="ds-alert ds-alert--danger">Couldn’t load data.</div>
```

### Icons (Lucide-compatible)
```html
<svg class="ds-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
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
  <div class="ds-page-header__top">
    <div><h1 class="ds-page-header__title">Projects</h1><p class="ds-page-header__subtitle">Delivery tracking</p></div>
    <div class="ds-page-header__actions"><button class="ds-button">Export</button><button class="ds-button ds-button--primary">New</button></div>
  </div>
</header>
```

## A full small screen (assembles the above)

```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/@diametral/design-system/dist/diametral.css">
<body style="background:var(--ds-bg);margin:0;">
  <main style="max-width:1100px;margin:0 auto;padding:32px;">
    <header class="ds-page-header"><div class="ds-page-header__top">
      <div><p class="ds-kicker">Overview</p><h1 class="ds-page-header__title">Pricing matrix</h1></div>
      <div class="ds-page-header__actions"><button class="ds-button ds-button--primary">New rate</button></div>
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

## Don'ts
- ❌ rounded corners, shadows, gradients, glassmorphism.
- ❌ accent-colored primary buttons (primary is **black**); accent is for links/emphasis.
- ❌ inventing `.ds-*` names or restyling existing ones — compose with inline layout instead.
- ❌ raw hex when a token exists.

The full component catalogue, live: https://littlebigcode.github.io/design-system/
