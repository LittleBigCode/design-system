# Logo & brand marks

The Diametral symbol is built on three fundamental elements:

- **The circle** — the space of intelligence & complexity.
- **The square** — the structure that brings stability.
- **The line** — Diametral's clear positioning.

## Files

| File | What it is | Use it for |
|---|---|---|
| `diametral-mark.svg` | The symbol (circle + square + diagonal line). Stroke is `currentColor`, so it inherits text color. | The primary mark, everywhere. Set `color:` to recolor it. |
| `diametral-mark-light.svg` | Same symbol, stroke hard-coded to `#ffffff`. | Embedding as `<img>` on dark backgrounds where `currentColor` cannot be set. |
| `favicon.svg` | The symbol on a Jaune (`#F4FBDA`) tile. | Browser favicon (`<link rel="icon">`). |
| `diametral-wordmark.png` | The "Diametral" wordmark (raster, from the brand charter). | A ready-made wordmark image. Prefer rendering the word live in the title font (see below) when possible. |
| `diametral-keyvisual.png` | The expanded key visual (symbol with directional arrows, raster). | Decorative / large-format brand moments. |

## The wordmark

The canonical wordmark is simply the word **Diametral** set in the title typeface
(`--ds-font-title`, Ufficio Light 300 or the Fraunces fallback). Rendering it as live
text keeps it crisp at any size and recolorable via `color:`. The mark + wordmark
lockup used across the showcase is:

```html
<span class="ds-wordmark">
  <svg class="ds-wordmark__mark" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <circle cx="28" cy="28" r="24"/><rect x="12" y="12" width="32" height="32"/><line x1="12" y1="44" x2="44" y2="12"/>
  </svg>
  <span class="ds-wordmark__name">Diametral</span>
</span>
```

## Clear space & misuse

- Keep clear space around the mark equal to the radius of its circle.
- Do not add a border-radius, drop shadow, gradient, or rotation.
- Do not recolor the mark into the secondary palette; it is ink (`--ds-ink`) on light,
  or white on dark.

> The PNG wordmark/key visual are raster exports from the brand charter
> (`graphics_assets.zip`). If you need vector versions, vectorize them from the
> charter source or set the wordmark as live text.
