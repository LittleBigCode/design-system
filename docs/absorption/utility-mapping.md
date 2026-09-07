# Utility mapping — Tailwind demo classes → `.ds-*`

Companion to [`direction.md`](./direction.md) decision 7. Batch 10
([#43](https://github.com/LittleBigCode/design-system/issues/43)) built this
table and [`css/utilities.css`](../../css/utilities.css); batch 16 reads this
table to codemod incoming's Tailwind-wrapped demos onto the HTML tab (decision
8). Measured against `migration-source-v1`'s 443 demos: 1,653 Tailwind-utility
uses across 192 distinct classes, top 30 covering 79%, top 100 covering 94%.

## The table

Gap entries are index-mapped onto the `--ds-space-*` scale
(`docs/foundations.md` #Spacing), not onto Tailwind's own pixel numbering —
where a source `gap-N` sits between two `--ds-space-*` steps, it rounds up to
the nearer/higher one.

| source class | target class | why |
| --- | --- | --- |
| `flex` | `.ds-flex` | |
| `flex-col` | `.ds-flex-col` | |
| `flex-row` | `.ds-flex` | row is `.ds-flex`'s default `flex-direction`; no separate class |
| `flex-wrap` | `.ds-flex-wrap` | |
| `grid` | `.ds-grid` | |
| `items-start` | `.ds-items-start` | |
| `items-center` | `.ds-items-center` | |
| `items-end` | `.ds-items-end` | |
| `items-baseline` | `.ds-items-baseline` | |
| `items-stretch` | `.ds-items-stretch` | |
| `justify-start` | `.ds-justify-start` | |
| `justify-center` | `.ds-justify-center` | |
| `justify-between` | `.ds-justify-between` | |
| `justify-end` | `.ds-justify-end` | |
| `gap-0.5` (2px) | `.ds-gap-1` (4px) | only step below it |
| `gap-1` (4px) | `.ds-gap-1` (4px) | exact |
| `gap-1.5` (6px) | `.ds-gap-2` (8px) | tie between space-1/space-2, rounds up |
| `gap-2` (8px) | `.ds-gap-2` (8px) | exact |
| `gap-2.5` (10px) | `.ds-gap-3` (12px) | tie between space-2/space-3, rounds up |
| `gap-3` (12px) | `.ds-gap-3` (12px) | exact |
| `gap-4` (16px) | `.ds-gap-4` (16px) | exact |
| `gap-5` (20px) | `.ds-gap-5` (24px) | tie between space-4/space-5, rounds up |
| `gap-6` (24px) | `.ds-gap-5` (24px) | exact — note the class number shifts; the scale is coarser than Tailwind's here |
| `gap-8` (32px) | `.ds-gap-6` (32px) | exact |
| `gap-10` (40px) | `.ds-gap-7` (40px) | exact |
| `w-full` | `.ds-w-full` | |
| `text-xs` | `.ds-text-xs` | |
| `text-sm` | `.ds-text-sm` | |
| `text-muted-foreground` | `.ds-text-muted` | same target as the batch-9 global slot (`--muted-foreground` → `--ds-ink-soft`, [`slot-mapping.md`](./slot-mapping.md)) |
| `text-right` | `.ds-text-right` | |

## What has no mapping — inline `style=` at the call site

Real, measured, but outside the capped categories (widths/heights beyond
`w-full`, colour, padding/margin, border, font-weight/family, letter-spacing,
align-self, flex-grow, grid-template). Batch 16's codemod emits an inline
style rather than growing this layer:

- **Width/height**: `max-w-sm`/`md`/`lg`/`xl`/`2xl`/`3xl`, `w-fit`, `w-auto`,
  every fixed `w-*`/`h-*`/`size-*`, `min-w-*`, `min-h-*`, `max-h-*`
- **Colour/border**: `border`, `border-border`, `border-b`, `border-t`,
  `border-dashed`, `text-foreground`, `bg-muted*`, `bg-card`, `bg-background`
- **Spacing outside gap**: every `p-*`/`px-*`/`py-*`/`pt-*`/`pb-*`/`ps-*`/`pe-*`,
  `m-*`/`mt-*`/`mb-*`/`ms-*`, `space-y-*`
- **Type outside the four capped classes**: `font-mono`, `font-semibold`,
  `font-medium`, `font-normal`, `uppercase`, `tracking-wider`/`widest`,
  `tabular-nums`, `text-center`, `text-start`, `text-end`, `text-2xl`,
  `text-xl`, `text-base`, `text-3xl`
- **Item/flex modifiers**: `self-start`, `flex-1`
- **Anything with a Tailwind variant prefix or arbitrary value**:
  `sm:grid-cols-2`, `hover:*`, `group*`, `data-*:*`, `aria-*:*`,
  `text-[0.6875rem]`, `w-[30rem]`, `[--bullet-value:3.5rem]`, and similar

## What is deliberately not in this table

**Axis-specific gap** (`gap-x-*`, `gap-y-*`) — the layer ships one `gap`
property per class, not row/column splits; falls to inline `style=`.

**Any class already covered by an existing component surface** —
`css/components/grid.css` ships `.ds-frame`, `.ds-ruled`, `.ds-statgrid`
already; this table does not re-derive them from Tailwind equivalents.
