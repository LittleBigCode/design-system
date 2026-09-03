"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { variants } from "../lib/variants.js"

/* Badge — a small uppercase label for a count, a state, a category.
   ---------------------------------------------------------------------------
   Moved out of `react/index.tsx` in 1.0.0-beta.7. `<ds-badge>` concatenates
   `ds-badge--${variant}` from a pass-through attribute, so the modifier family
   is frozen (css-ledger §1): 0.11's `solid` and `accent` stay, and the source's
   six land beside them rather than over them.

   Polymorphic through Base UI's useRender, which is what the applier did not
   have — `badge.css` styles `:is(a):hover` on three of the variants, and until
   now nothing in the package could render a badge as a link to reach them.

   Badge is the *typographic* label; `Tag` is the tinted boxed one. The line
   between them is the box, not the size. */
const badgeVariants = variants("ds-badge", {
  variants: {
    variant: {
      default: "ds-badge--default",
      solid: "ds-badge--solid",
      accent: "ds-badge--accent",
      secondary: "ds-badge--secondary",
      destructive: "ds-badge--destructive",
      outline: "ds-badge--outline",
      ghost: "ds-badge--ghost",
      link: "ds-badge--link",
    },
  },
  defaultVariants: { variant: "default" },
})

export type BadgeVariant =
  | "default"
  | "solid"
  | "accent"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { className: badgeVariants({ variant, className }) },
      props,
    ),
    render,
    state: { slot: "badge", variant },
  })
}

export { Badge, badgeVariants }