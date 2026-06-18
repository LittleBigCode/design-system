# Figma token export

The design system ships its tokens to Figma as a **Tokens Studio for Figma** file so
designers paint with the exact same values engineers ship — no eyeballing hex codes off a
spec.

`scripts/build-figma.mjs` reads the single source of truth, [`tokens/tokens.json`](../tokens/tokens.json),
and writes **`dist/figma-tokens.json`** in the Tokens Studio JSON format. Every leaf token is

```json
{ "value": "#ff2a00", "type": "color", "description": "Signal red — charter canonical accent." }
```

Zero dependencies — it runs on Node ≥ 18 with built-ins only.

> `dist/` is a generated convenience build (it is git-ignored). Run the script below to
> produce `dist/figma-tokens.json`, then hand that file to your designers (share it, drop it
> in the Figma project, or commit it to wherever your design team pulls assets from).

## Build it

```bash
node scripts/build-figma.mjs
```

It prints a one-line summary plus a per-group count, e.g.

```
build-figma: 96 tokens -> dist/figma-tokens.json
  groups: color 64, spacing 8, fontSize 8, lineHeight 2, fontFamily 2, fontWeight 1, radius 1, layout 4, zIndex 4, motion 2
```

**Re-run it whenever `tokens/tokens.json` changes** so the Figma file stays in lock-step with
the CSS the app ships. (It is also wired into the repo's main build.)

## Import into Figma

1. Open your Figma file and run the **Tokens Studio for Figma** plugin
   (Plugins → **Tokens Studio for Figma**). Install it from the Figma Community first if you
   don't have it.
2. In the plugin, open the settings/overflow menu and choose **Import**.
3. Select **`dist/figma-tokens.json`** (the file produced by the build above).
4. Apply the set. The tokens land as a nested tree — `color`, `spacing`, `fontSize`, … — that
   you can bind to fills, text styles, spacing and so on.

After import you can push the tokens to native Figma **variables / styles** from the plugin if
your team works that way. Re-importing the freshly built file after a token change updates the
set in place.

## How the groups map to the CSS `--ds-*` variables

The Figma tree mirrors the three token tiers in `tokens.json`. Each leaf corresponds to one
`--ds-*` custom property; the group + key are the `--ds-` name with its prefix stripped.

| Figma group | Tokens Studio `type` | CSS variable pattern | Example |
| --- | --- | --- | --- |
| `color` | `color` | `--ds-*` colors (primitives **+** semantic **+** compat aliases) | `color.rouge` → `--ds-rouge` (`#ff2a00`) |
| `spacing` | `spacing` | `--ds-space-*` | `spacing.4` → `--ds-space-4` (`16px`) |
| `fontSize` | `fontSizes` | `--ds-text-*` | `fontSize.base` → `--ds-text-base` (`14px`) |
| `lineHeight` | `lineHeights` | `--ds-leading-*` | `lineHeight.normal` → `--ds-leading-normal` (`130%`) |
| `fontFamily` | `fontFamilies` | `--ds-font-{title,sans}` | `fontFamily.title` → `--ds-font-title` |
| `fontWeight` | `fontWeights` | `--ds-font-weight-*` | `fontWeight.title` → `--ds-font-weight-title` (`300`) |
| `radius` | `borderRadius` | `--ds-radius-*` | `radius.none` → `--ds-radius-none` (`0`) |
| `layout` | `other` | `--ds-maxw-*`, `--ds-bp-*` | `layout.page` → `--ds-maxw-page` (`1440px`) |
| `zIndex` | `other` | `--ds-z-*` | `zIndex.toast` → `--ds-z-toast` (`90`) |
| `motion` | `other` | `--ds-transition*` | `motion.base` → `--ds-transition` (`.2s ease`) |

The `borderWidth` and `boxShadow` Tokens Studio types are also supported by the build — if a
`--ds-border-width-*` or `--ds-shadow-*` token is ever added to `tokens.json`, it lands in its
own group automatically.

### Semantic & alias tokens are resolved to concrete values

In `tokens.json`, Tier-2 semantic tokens and the compat aliases reference primitives with
`{braces}` (the CSS build turns these into `var(--…)`). For Figma, the build **resolves each
reference all the way down to its concrete value** so designers get a real color, not a
pointer:

- `color.accent` → `{ds-rouge}` → **`#ff2a00`**
- `color.color-red` → `{ds-accent-legacy}` → `{ds-orange}` → **`#ff5500`** (chased through the chain)

So both the primitive (`color.rouge`) and everything that points at it (`color.accent`,
`color.color-red`, …) carry the same final hex — change the primitive in `tokens.json`, re-run
the build, re-import, and every dependent token updates. The original intent of each token is
preserved in the `description` field, which shows up in the plugin.

## See also

- [`docs/foundations.md`](foundations.md) — the token tiers and the `--ds-*` surface.
- [`docs/theme-generator.md`](theme-generator.md) — white-label per client by overriding the
  Tier-2 semantic tokens.
- [`scripts/build-tokens.mjs`](../scripts/build-tokens.mjs) — the sibling build that emits the
  CSS / SCSS / Tailwind artifacts from the same `tokens.json`.
