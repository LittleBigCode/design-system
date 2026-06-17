# Principles

Diametral's DNA: **Minimal · Enduring · Elegant.** A refined, structured aesthetic,
deliberately away from the typical color codes of tech and consulting.

## Flat & sharp

- **No border-radius.** Everything is square. This is the single most distinctive rule —
  it has its own page, [no-radius.md](no-radius.md), and its own token, `--ds-radius-none`.
- **1px borders, no shadows.** Separation comes from hairline rules (`--ds-rule`,
  `--ds-rule-soft`) and background shifts — never from elevation/shadow.
- **White & whitesmoke surfaces, black ink.** `--ds-bg` (#fff), `--ds-bg-alt` (#f5f5f5),
  `--ds-ink` (#161616).

## Restrained type

- **Ufficio Light 300 titles over Geist body.** Two voices, one weight idea: titles are
  light and large; body is quiet.
- **Uppercase labels at `0.08em`.** The `.ds-label` / `.ds-kicker` treatment marks
  structure without shouting.
- **Tabular numerals everywhere numbers matter** (`font-variant-numeric: tabular-nums`),
  so figures align in columns.

## Color with meaning

- One **accent** — the brand signal red `--ds-accent` (#FF2A00). Used sparingly: tab
  underline, focus, selection.
- **Status is semantic, not decorative** — success / warning / danger / critical / neutral
  / info map to muted, legible hues, not the vivid secondary palette.
- The **secondary palette** (bright green, cyan, yellow) is for illustration and accent
  moments, not UI chrome.

## Motion

- Short and functional: `--ds-transition` (.2s ease), `--ds-transition-slow` (.25s ease).
- One entrance animation, `ds-fadein`. `prefers-reduced-motion` is respected.

## Engineering

- **Buildless first.** The CSS and Web Components work with no toolchain.
- **Token-driven.** Components read **semantic** tokens only, so theming is a matter of
  re-pointing variables — see [theming.md](theming.md).
- **Namespaced.** Every class is `.ds-*`; the system never styles bare elements globally
  (beyond the opt-in reset).
