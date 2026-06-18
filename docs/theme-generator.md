# Theme generator

White-label the design system per client or entity in seconds. `scripts/make-theme.mjs`
derives a coherent set of **Tier-2 SEMANTIC token overrides** from a couple of brand
inputs and writes `css/themes/<name>.css` — a drop-in opt-in theme, exactly the shape of
the hand-written [`sepia.css`](../css/themes/sepia.css) and [`dark.css`](../css/themes/dark.css).
Primitives and component rules are never touched, so a generated theme is a re-skin, not a fork.

Zero dependencies — it runs on Node ≥ 18 with built-ins only.

> Theming overrides the semantic tokens only. See [theming.md](theming.md) for the
> hand-written approach and the full token surface.

## Run it

```bash
node scripts/make-theme.mjs --name ocean --accent "#1488a6"
```

This writes `css/themes/ocean.css` and prints a one-line summary. Give it more seeds for a
fuller re-skin:

```bash
# tinted surfaces + custom ink
node scripts/make-theme.mjs --name ocean --accent "#1488a6" --ink "#0e1a1e" --bg "#f4f8f9"

# a dark variant
node scripts/make-theme.mjs --name midnight --accent "#1488a6" --dark
```

## Flags

| Flag | Required | Effect |
| --- | --- | --- |
| `--name <slug>` | yes | Theme name. Becomes the `[data-theme="<slug>"]` selector and the filename `css/themes/<slug>.css`. Must be a slug (letters, digits, hyphens). |
| `--accent <hex>` | yes | Brand accent. Sets `--ds-accent`, a light tint `--ds-accent-bg`, and a derived shade `--ds-accent-strong`. `--ds-on-accent` flips to dark or white text by accent luminance. |
| `--ink <hex>` | no | Base text colour → `--ds-ink`, with softened `--ds-ink-soft` / `--ds-ink-faint`. Defaults to near-black (or near-white under `--dark`). |
| `--bg <hex>` | no | Base page colour → `--ds-bg`, with derived `--ds-bg-alt` / `--ds-surface` and accent-tinted rule lines. Defaults to white (or a dark base under `--dark`). |
| `--dark` | no | Produce a dark surface ramp (dark `--ds-bg`, light `--ds-ink`, translucent accent/status tints), seeded from `--bg`/`--ink` if given. |
| `--force` | no | Overwrite an existing `css/themes/<name>.css`. Without it, the script refuses to clobber. |

### What it derives

From the inputs the script produces the same override set the hand-written themes touch:

- **Surfaces** — `--ds-bg`, `--ds-bg-alt`, `--ds-surface`, `--ds-overlay-scrim`
- **Ink** — `--ds-ink`, `--ds-ink-soft`, `--ds-ink-faint`
- **Lines** — `--ds-rule`, `--ds-rule-soft` (tinted a hair toward the accent)
- **Accent** — `--ds-accent`, `--ds-accent-bg` (tint), `--ds-accent-strong` (shade), `--ds-on-accent`
- **Status tints** — `--ds-success-bg`, `--ds-warning-bg`, `--ds-danger-bg`, `--ds-info-bg`,
  `--ds-neutral-bg`, `--ds-critical-bg` (status hues/heads are kept for legibility; only the
  soft backgrounds are re-based onto the new surface)

The colour math is plain hex→rgb plus `lighten` / `darken` / `mix` helpers — no perceptual
colour space, so treat the output as a strong starting point and hand-tweak the seeds (not the
generated file) if a particular hue needs nudging.

## Load the output

It is an ordinary opt-in stylesheet. Add it after the base bundle and set `data-theme` on the
root element:

```html
<link rel="stylesheet" href="css/diametral.css">
<link rel="stylesheet" href="css/themes/ocean.css">

<html data-theme="ocean">
```

Via npm the path resolves the same way:

```js
import "@diametral/design-system/css/diametral.css";
import "@diametral/design-system/css/themes/ocean.css";
```

Ship one base bundle plus one generated theme per client, and flip `data-theme` to brand the app.

## Switch at runtime

Setting (or clearing) the attribute on `<html>` re-skins everything live — components read the
semantic tokens, so no re-render or reload is needed:

```js
// activate a theme
document.documentElement.setAttribute("data-theme", "ocean");

// back to the default (un-themed :root) look
document.documentElement.removeAttribute("data-theme");
```

In React, [`<ConsoleLayout themes>`](react.md) ships a built-in **Light / Dark / Sepia**
segmented switcher that drives `data-theme` on `<html>` for you:

```jsx
<ConsoleLayout themes nav={nav} active={active} onNavigate={go}>
  {page}
</ConsoleLayout>
```

To offer a generated theme (e.g. `ocean`) in your own switcher, reuse the same one-liner above —
`setAttribute("data-theme", "ocean")` — after loading `css/themes/ocean.css`.

## Example output

`node scripts/make-theme.mjs --name ocean --accent "#1488a6"` produces
[`css/themes/ocean.css`](../css/themes/ocean.css):

```css
[data-theme="ocean"] {
  /* Surfaces & text */
  --ds-bg:            #ffffff;
  --ds-bg-alt:        #ecf0f2;
  --ds-surface:       #ffffff;
  /* … */
  /* Accent — brand signal, with derived tint & shade */
  --ds-accent:        #1488a6;
  --ds-accent-bg:     #e3f1f4;
  --ds-accent-strong: #107088;
  --ds-on-accent:     #ffffff;
  /* … */
}
```
