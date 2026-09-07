# Slot mapping — the global token codemod

Companion to [`direction.md`](./direction.md) decision 10. Batch 9 ([#42](https://github.com/LittleBigCode/design-system/issues/42))
built this table and the script that applies it; batch 16 ([#49](https://github.com/LittleBigCode/design-system/issues/49))
re-applies it on every remaining source re-copy. The executable form is
[`scripts/slot-mapping.json`](../../scripts/slot-mapping.json), read by
[`scripts/codemod-slots.mjs`](../../scripts/codemod-slots.mjs) — edit the JSON,
not this table, if a mapping needs to change.

`migration-source-v1`'s CSS carries a shadcn-style unprefixed token vocabulary.
Landing it as-is would declare `--border`, `--primary`, `--background` and
friends on every consumer's `:root`, repainting any shadcn app that also
happens to load this package. Every unprefixed global reference is codemodded
to a `--ds-*` token before the file lands; nothing unprefixed reaches a
consumer's `:root`.

## The table

| source slot | target token | why |
| --- | --- | --- |
| `--background` | `--ds-bg` | page/surface background |
| `--foreground` | `--ds-ink` | primary text |
| `--muted` | `--ds-bg-alt` | muted/subtle surface tint |
| `--muted-foreground` | `--ds-ink-soft` | secondary text |
| `--accent` | `--ds-bg-alt` | shadcn's `--accent` is a subtle hover/highlight surface, not the brand accent — same tone as `--muted` in this vocabulary, not `--ds-accent` |
| `--accent-foreground` | `--ds-ink` | plain text on that highlight surface (not `--ds-on-accent`, which is for text on the *solid* brand fill) |
| `--secondary` | `--ds-bg-alt` | no distinct secondary surface tier exists; reuses the muted tone |
| `--secondary-foreground` | `--ds-ink` | |
| `--card` | `--ds-surface` | card/elevated-surface background |
| `--card-foreground` | `--ds-ink` | |
| `--popover` | `--ds-surface` | popover/menu surface |
| `--popover-foreground` | `--ds-ink` | |
| `--primary` | `--ds-accent` | the brand signal colour |
| `--primary-foreground` | `--ds-on-accent` | text/icons on a *solid* `--ds-accent` fill |
| `--destructive` | `--ds-danger` | |
| `--border` | `--ds-rule` | |
| `--input` | `--ds-rule` | shadcn defines `--input` as the input border colour — same role as `--border` here, no separate token |
| `--ring` | `--ds-focus-ring` | |
| `--font-heading` | `--ds-font-title` | already the established mapping across every batch that landed one (`card`, `datagrid`, `empty-state`, `grid`, `gauge`, `donut-chart`, `drawer`, `kanban`, `page-header`, `modal`, `sheet`, `stat-card`, `status-panel`, `tabs`, `wordmark`) |
| `var(--font-mono)` (literal, not a token) | `ui-monospace, "SF Mono", "Geist Mono", Menlo, Consolas, monospace` | the target defines no `--ds-*` mono token; already the established literal substitution (`chart`, `funnel-chart`, `code-block`, `treemap`, `waterfall-chart`, `snippet`, `toc`) |

## What is deliberately not in this table

**Component-local vars stay untouched** — they are scoped to their own rule,
not read globally, and renaming them buys nothing: `--tone`, `--tone-ink`,
`--tone-bg`, `--cell-radius`, `--cell-size`, `--panel-spacing`,
`--card-spacing`, `--transform-origin`, `--gap`, `--offset-y`, `--drawer-inset`,
`--drawer-swipe-strength`, `--btn`, `--btn-fg`.

**Base UI positioner and animation-state vars stay untouched** — they are set
inline by Base UI itself (`--anchor-width`, `--available-height`,
`--available-width`) or by a component's own JS (`--toast-index`,
`--toast-height`, `--toast-swipe-movement-x/y`, `--stack-height`,
`--stack-shrink`, `--stack-peek-offset`). Nothing in `css/` defines them; they
are a Base UI/component coupling, not a global slot.

**`--sidebar-*` (8 vars: `--sidebar`, `--sidebar-foreground`,
`--sidebar-border`, `--sidebar-accent`, `--sidebar-accent-foreground`,
`--sidebar-ring`, `--sidebar-width`, `--sidebar-width-icon`) stay untouched** —
they are scoped to `sidebar.css`, which never lands wholesale. Only two
cherry-picks port onto `AppShell` (batch 8, already landed); the other 23
composition parts, `sidebar.css` included, do not.
