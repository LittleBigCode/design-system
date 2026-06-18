# Getting started

The design system is buildless: add a stylesheet, load the fonts, write `.ds-*` markup.

## 1. Add the stylesheet

```html
<link rel="stylesheet" href="css/diametral.css">
```

`css/diametral.css` `@import`s the tokens, reset, typography, and every component. For
production you can instead point at the concatenated `dist/diametral.css` (run
`npm run build` first), but it is not required.

From an app stylesheet:

```css
@import url("css/diametral.css");
```

Via npm:

```js
import "@littlebigcode/design-system/css/diametral.css";
```

## 2. Load the fonts

**Body — Geist** (free, OFL):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**Titles — Ufficio** (commercial) *or* the free Fraunces fallback. The title token lists
Ufficio first; it renders **only** if you import its `@font-face`:

```html
<!-- only if you hold an Ufficio license: -->
<link rel="stylesheet" href="assets/fonts/ufficio.css">
```

If you don't import it, titles fall back to Fraunces / Georgia automatically. To load the
free fallbacks explicitly: `@import url("assets/fonts/fallback.css")`. See
[fonts-and-licensing.md](fonts-and-licensing.md).

## 3. Write markup

```html
<div class="ds-panel">
  <div class="ds-panel__title">Sale</div>
  <div class="ds-input-row">
    <label>Day rate <span class="ds-input-row__unit">€</span></label>
    <input class="ds-input ds-input--number" type="number" value="900">
  </div>
</div>

<button class="ds-button ds-button--primary">Save</button>
```

## 4. (Optional) Web Components

```html
<script type="module" src="components/index.js"></script>
<ds-button variant="primary">Save</ds-button>
```

See [the components reference](components.md) and the live [`examples/`](../examples/) showcase.

## Gotchas

- **`file://` fonts** — Geist/Ufficio load fine over `file://`; only the Google Fonts
  `<link>` needs a network. The system still renders with system fallbacks offline.
- **Reset** — `css/diametral.css` includes a light global reset (`box-sizing`, zeroed
  margins, base body type). If your app already has a reset and you want to avoid overlap,
  import `css/tokens.css` plus the individual `css/components/*.css` partials instead of the
  full bundle.
- **Namespacing** — every class is prefixed `.ds-*`, so it won't collide with your app's
  existing CSS or Tailwind utilities.
