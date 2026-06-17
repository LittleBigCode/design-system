# Tokens

The Diametral token system is a flat set of CSS custom properties, all prefixed `--ds-*`,
organised in **three tiers**. [`tokens.json`](tokens.json) is the **single source of truth**;
[`../css/tokens.css`](../css/tokens.css) mirrors it for the buildless path.

## The three tiers

1. **Primitives** — raw brand / neutral / functional values. These are the literal hexes and
   pixels (`--ds-noir` `#161616`, `--ds-rouge` `#ff2a00`, `--ds-grey` `#cdced0`). Components
   **never** read primitives directly; primitives only feed Tier 2.
2. **Semantic** — role-based aliases that components actually read, and the **only** tier
   themes override. Surfaces and text (`--ds-bg`, `--ds-surface`, `--ds-ink`, `--ds-ink-soft`,
   `--ds-ink-faint`), lines (`--ds-rule`, `--ds-rule-soft`), accent (`--ds-accent`,
   `--ds-focus-ring`), and the status families (`--ds-success`, `--ds-warning`, `--ds-danger`,
   `--ds-critical`, `--ds-neutral`, `--ds-info`, each with a `*-bg` tint).
3. **Scale** — spacing (`--ds-space-1` … `--ds-space-8`), type (`--ds-text-*`,
   `--ds-leading-*`, `--ds-font-title`, `--ds-font-sans`, `--ds-font-weight-title`), layout
   (`--ds-maxw-*`, `--ds-bp-md`), elevation (`--ds-z-*`), motion (`--ds-transition`,
   `--ds-transition-slow`), and the flat-corner knob `--ds-radius-none`.

Theming overrides the **semantic** tier only — see [`../docs/theming.md`](../docs/theming.md).

## Source of truth & mirroring

`tokens.json` is canonical. `css/tokens.css` is a hand-maintained mirror so the system works
with a single `<link>` and no build. When you change one, change the other (the JSON first),
then regenerate the artifacts. See [`../CONTRIBUTING.md`](../CONTRIBUTING.md).

A small set of **compat aliases** (`--ds-color-*`) re-expose the source app's original names
(e.g. `--ds-color-black` → `--ds-noir`) for incremental migration. They are kept in both files.

## The `{ref}` convention

In `tokens.json`, a `$value` wrapped in `{braces}` references another token by its `name`; the
generator emits `var(--name)`. A bare value is emitted literally.

```json
"ink":    { "name": "ds-ink",    "$type": "color", "$value": "{ds-noir}" }
"accent": { "name": "ds-accent", "$type": "color", "$value": "{ds-rouge}" }
"space_4":{ "name": "ds-space-4","$type": "dimension", "$value": "16px" }
```

emits:

```css
--ds-ink: var(--ds-noir);
--ds-accent: var(--ds-rouge);
--ds-space-4: 16px;
```

This is what wires Tier 2 onto Tier 1 (and the compat aliases onto their targets) while keeping
the override surface clean: re-point `--ds-ink` and everything reading it follows.

## Build

The build is optional and dependency-free (Node built-ins only). It does **not** gate
consumption of the system — `dist/` is a convenience layer.

```bash
npm run build:tokens
```

generates:

- `dist/tokens.css` — the `:root { --ds-* }` block.
- `dist/tokens.scss` — the same tokens as SCSS `$variables`.
- `dist/tailwind-preset.cjs` — a Tailwind preset exposing the tokens.

See `scripts/build-tokens.mjs`.

## Palette reconciliation

The token palette reconciles three sources, and the **brand charter is canonical for brand
hues**:

- **Accent.** `--ds-accent` = **`#FF2A00`** (`--ds-rouge`), the charter's signal red. The
  pre-charter accent `#ff5500` is retained as **`--ds-accent-legacy`** (and as the warning hue
  **`--ds-warning`**) for pixel-frozen migration off the original app — it is *not* the brand
  accent.
- **Status hues are from the source app.** The muted functional colors — `--ds-green`
  `#2e7d4f`, `--ds-orange` `#ff5500`, `--ds-red` `#c0392b`, plus their tints — come from the
  application and are tuned for legibility, not from the charter's vivid secondary palette.
  `--ds-info` `#1488a6` is DS-introduced, harmonized with the brand blue.
- **⚠️ `--ds-vert` (`#89FC79`) is SAMPLED from the charter PNG.** Its swatch label in the
  charter was a copy-paste typo, so the hex was eye-dropped from the artwork rather than read
  from a reliable value. **Flag for brand-owner confirmation before `1.0`** — see
  [`../docs/versioning.md`](../docs/versioning.md).

See the live color foundation:
**[../examples/foundations/color.html](../examples/foundations/color.html)**.
