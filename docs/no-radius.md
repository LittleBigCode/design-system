# No radius

> **Minimal · Enduring · Elegant.**

Diametral has exactly one corner radius, and it is **zero**. Everything is square — buttons,
inputs, badges, chips, panels, the modal, the status panel's solid head. This is the single
most distinctive rule of the system, the visual *parti pris* that separates it from the
rounded, soft-shadowed defaults of most tech and consulting interfaces.

The whole behaviour is exposed through **one token**:

```css
--ds-radius-none: 0;
```

## Why flat

Diametral's language is built from **1px rules, no shadows, white / whitesmoke surfaces, and
black ink**. Separation comes from hairlines and background shifts, never from elevation.
Rounded corners belong to the opposite vocabulary — soft, friendly, *material*. Keeping every
corner sharp is what makes the system read as refined and structured rather than generic. The
flat treatment is deliberate, and it is consistent: there is no "slightly rounded" exception
anywhere in the system.

## How components consume it

No component hard-codes a corner. Every bordered or filled surface reads the same token:

```css
.ds-button   { border-radius: var(--ds-radius-none); }
.ds-input    { border-radius: var(--ds-radius-none); }
.ds-badge    { border-radius: var(--ds-radius-none); }
.ds-chip     { border-radius: var(--ds-radius-none); }
.ds-banner   { border-radius: var(--ds-radius-none); }
.ds-callout  { border-radius: var(--ds-radius-none); }
.ds-panel    { border-radius: var(--ds-radius-none); }
.ds-status   { border-radius: var(--ds-radius-none); }
.ds-segmented__item { border-radius: var(--ds-radius-none); }
.ds-modal    { border-radius: var(--ds-radius-none); }
.ds-table input { border-radius: var(--ds-radius-none); }
```

Because they all point at the same custom property, the corner of the system is a single,
addressable knob rather than a value scattered across a dozen files.

## How not to break it

- **Never write a literal radius.** Do not add `border-radius: 4px` (or any non-token value)
  to a component or to app code that consumes the system. A hard-coded radius is invisible to
  the token and silently breaks the flat language.
- **Always reference the token.** New components must declare
  `border-radius: var(--ds-radius-none)` like every existing one — see
  [CONTRIBUTING.md](../CONTRIBUTING.md).
- **Don't reach for shadows or soft corners** to create depth. Use `--ds-rule` /
  `--ds-rule-soft` hairlines and `--ds-bg-alt` background shifts instead.

## Rounding the whole system at once

Because the radius lives in exactly one place, a brand that *wants* rounded corners does not
edit any component. It overrides the single token — typically in a theme or on `:root` after
the stylesheet — and every square corner in the system rounds together, consistently:

```css
:root {
  --ds-radius-none: 8px; /* the whole system rounds at once */
}
```

This is the same override surface used for theming: change one variable, and buttons, inputs,
chips, panels, modals and the status panel all follow. (The token is named `--ds-radius-none`
because *zero is the canonical Diametral value*; the name documents the default intent even
when a brand re-points it.)

See it live: **[../examples/foundations/no-radius.html](../examples/foundations/no-radius.html)**.
