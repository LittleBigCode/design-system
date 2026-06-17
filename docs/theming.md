# Theming

Theming overrides the **semantic (Tier 2) tokens only**. Primitives and component rules
are never touched — so a theme is ~20 lines of variable overrides, not a re-skin.

## How it works

Components read semantic tokens (`--ds-ink`, `--ds-bg`, `--ds-accent`, `--ds-success`, …).
Re-point those on a root element and everything follows.

```css
[data-theme="acme"] {
  --ds-accent: #0057ff;
  --ds-accent-bg: #e8f0ff;
  --ds-bg-alt: #f3f5f8;
  --ds-font-title: "Fraunces", Georgia, serif;
}
```

See the worked example in [`css/themes/_brand-example.css`](../css/themes/_brand-example.css).

## Dark mode

Import the dark theme and set one of the supported selectors on a root element:

```html
<link rel="stylesheet" href="css/diametral.css">
<link rel="stylesheet" href="css/themes/dark.css">
<html data-theme="dark">   <!-- or class="dark", or class="dark-theme" -->
```

`css/themes/dark.css` targets `[data-theme="dark"]`, `.dark`, **and** `:root.dark-theme`,
so it is drop-in regardless of which convention an app already uses. For OS-driven dark
mode, add `class="ds-auto-dark"` to `<html>` (opt-in, so light-only apps are unaffected).

Dark overrides re-point only the semantic surface/text/line/tint tokens; the accent stays
the brand red, status heads keep white text.

## Per-brand theming

1. Copy `_brand-example.css`, rename the `[data-theme="…"]` value.
2. Override the semantic tokens (and optionally `--ds-font-*`).
3. Import it and set the attribute on `<html>`.

Status families are overridable too, so a brand can retint success/warning/danger without
touching any component.

## Consuming from other stacks

- **CSS variables** are canonical. Any framework can read them.
- **Tailwind** — `npm run build:tokens` emits `dist/tailwind-preset.cjs` binding
  `colors`/`spacing`/`fontFamily`/… to the CSS variables. Add it to `presets` in
  `tailwind.config.js`.
- **SCSS** — `dist/tokens.scss` exposes `$ds-*` variables (each resolving to the CSS var,
  so runtime theming still works).
- **shadcn / HSL token apps** — keep your `--background`/`--accent`/… contract, and map it
  to the Diametral semantic tokens in a thin adapter (see [migration.md](migration.md)).
