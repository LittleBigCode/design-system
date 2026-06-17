# Migration guide

How to adopt the design system in apps that already have their own styles. The design
system itself is standalone — this guide documents adoption; it does not modify other repos.

## Old → `.ds-*` class map

The class names below come from the original `pricing_matrix` stylesheet.

| Old | New |
|---|---|
| `.btn` / `.btn.primary` / `.btn.danger` | `.ds-button` / `.ds-button--primary` / `.ds-button--danger` |
| `.switch` / `.track` | `.ds-switch` / `.ds-switch__track` |
| `.role-badge` | `.ds-badge` |
| `.tabs` / `.tab` / `.tab.active` / `.tab small` | `.ds-tabs` / `.ds-tabs__tab` / `.is-active` / `.ds-tabs__sublabel` |
| `.pane` / `.pane.active` | `.ds-tabpane` / `.is-active` |
| `.field` | `.ds-field` |
| `select`, `input[type=…]` | `.ds-input` (+ `.ds-input--number`) |
| `.context-bar` | `.ds-context-bar` |
| `.input-row` / `.unit` | `.ds-input-row` / `.ds-input-row__unit` |
| `.context-chips` / `.chip` / `.chip.warn` | `.ds-chips` / `.ds-chip` / `.ds-chip--warn` |
| `.banner` | `.ds-banner` |
| `.blocked` | `.ds-callout` (default warning tone) |
| `.input-section` / `h3` | `.ds-panel.ds-panel--rows` / `.ds-panel__title` |
| `.verdict` | `.ds-status` |
| `.verdict.green / .orange / .red / .black / .none` | `.ds-status--success / --warning / --danger / --critical / --neutral` |
| `.verdict-head` / `.kicker` / `.level` / `.who` | `.ds-status__head` / `__kicker` / `__title` / `__subtitle` |
| `.verdict-key` / `.k-green…` / `.on` | `.ds-status__key` / `.is-success…` / `.is-on` |
| `.verdict-body` / `.verdict-note` | `.ds-status__body` / `.ds-status__note` |
| `.metric` / `.hero` / `.sub` / `.v.pos` / `.v.neg` | `.ds-metric` / `--hero` / `--sub` / `.ds-metric__v.is-pos` / `.is-neg` |
| `.overlay` / `.overlay.show` | `.ds-overlay` / `.is-open` |
| `.modal` / `.modal-head` / `h2` / `.close` / `.modal-body` / `.modal-foot` / `.spacer` | `.ds-modal` / `__head` / `__title` / `__close` / `__body` / `__foot` / `__spacer` |
| `.admin-section` / `> h3` | `.ds-section` / `.ds-section-heading` |
| `.entity-tabs` / `.entity-tab` / `.active` / `.dot.ok` / `.dot.ko` | `.ds-segmented` / `__item` / `.is-active` / `__dot--ok` / `__dot--ko` |
| `table.params` / `th` / `td` / `input.num` / `.grade-name` / `.row-del` | `.ds-table` / `th` / `td` / `.ds-table__num` / `.ds-table__name` / `.ds-table__row-action` |
| `header` / `.wordmark` / `.mark` / `h1` / `.sub` | `.ds-app-bar` / `.ds-wordmark` / `.ds-wordmark__mark` / `.ds-wordmark__name` / `.ds-wordmark__sub` |

CSS variables: `--bg → --ds-bg`, `--ink → --ds-ink`, `--accent → --ds-accent`,
`--green → --ds-success`, `--orange → --ds-warning`, `--red → --ds-danger`,
`--black → --ds-critical`, `--rule → --ds-rule`, `--title → --ds-font-title`, etc.

## The compat shim

For an incremental cutover, import the opt-in shim **after** the bundle:

```css
@import url("css/diametral.css");
@import url("css/compat/legacy-aliases.css");
```

It re-points the old unprefixed CSS variables (`--bg`, `--ink`, `--accent`, …) and a few
common bare classes (`.btn`, `.chip`, `.banner`, `.overlay`, `.modal`) to the new tokens,
so you can swap an inline `<style>` for a `<link>` before renaming everything. Prefer
renaming to `.ds-*` for the long term; the shim exists to stage the move, not to stay.

## Per-app notes

### pricing_matrix (vanilla)
- Replace the inline `<style>` block with `<link rel="stylesheet" href=".../css/diametral.css">`
  plus the Geist `<link>` and (licensed) `ufficio.css`.
- Rename classes per the table, **or** import `css/compat/legacy-aliases.css` for a staged move.
- To freeze the exact original orange during transition, set `--ds-accent: var(--ds-accent-legacy)`.

### recrutauto (React + shadcn, `front/src/styles/globals.css`)
- Replace the local HSL token block by importing the DS tokens and a thin adapter that maps
  the Diametral semantic tokens onto the shadcn contract (`--background`, `--accent`,
  `--accent-foreground`, …).
- Keep Outfit by overriding one variable: `--ds-font-sans: "Outfit", system-ui, sans-serif;`.
- Its existing `[data-theme="diametral"]` / `.dark` switch maps directly onto the DS theme
  convention (`css/themes/dark.css` already supports both selectors).

### scorecard (Angular + Tailwind, `frontend/src/styles.scss` + `tailwind.config.js`)
- Replace the bespoke `--brand-*` block with the generated `dist/tokens.scss`, and add
  `dist/tailwind-preset.cjs` to `presets` in `tailwind.config.js`.
- **Fix the drift** found during extraction: `--brand-gris #808892 → #767884`,
  `--brand-marron #9E8B72 → #9F8667` (the charter is canonical).
- Validate against its existing `design-system.component.html` page.
