# Web Components

Optional custom-element layer on top of the CSS. Each element renders **light
DOM** with `.ds-*` classes, so it is styled entirely by the global stylesheet and
**themed for free** via CSS variables (tokens pierce naturally — no shadow DOM,
no duplicated CSS). There is **no build step** required to use them.

## Setup

```html
<link rel="stylesheet" href="css/diametral.css">
<script type="module" src="components/index.js"></script>
```

Or via npm:

```js
import "@diametral/design-system/css/diametral.css";
import "@diametral/design-system/components"; // registers all elements
```

You can also import a single element: `import "@diametral/design-system/components/ds-modal.js"`.

## Elements

| Element | Key attributes | Notes |
|---|---|---|
| `<ds-button>` | `variant="primary\|danger"`, `type`, `disabled` | Renders a real `<button>`. |
| `<ds-badge>` | `variant="solid\|accent"` | Inline pill. |
| `<ds-callout>` | `type="info\|success\|warning\|danger"`, `heading` | Alert box; default tone is warning. |
| `<ds-panel>` | `title`, `rows` | Sunken content panel. |
| `<ds-section-heading>` | — | Uppercase label + hairline. |
| `<ds-status>` | `status`, `kicker`, `heading`, `subtitle` | The signature status panel; body stays in light DOM. |
| `<ds-switch>` | `checked`, `disabled`, `name` | Reflects `checked`; emits `change`. |
| `<ds-tabs>` | — | Wires `.ds-tabs__tab[data-pane]` ↔ `.ds-tabpane[data-pane]`; emits `change`. |
| `<ds-segmented>` | `mode="single\|multi"` | Toggles `.ds-segmented__item`s; emits `change`. |
| `<ds-modal>` | `open`, `heading` | Builds overlay+dialog; `.open()`/`.close()`; emits `ds-open`/`ds-close`. |

## Why light DOM?

A design system's job is to be themeable and composable. Shadow DOM would wall
off the global tokens and force every component to ship a copy of the CSS. Light
DOM lets `--ds-*` custom properties cascade in, lets utility classes compose, and
keeps the components dependency- and build-free. If you need style encapsulation
for a specific embed, wrap the element yourself — the CSS is the same.
