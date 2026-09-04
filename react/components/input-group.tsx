"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"
import { Button } from "./button.js"
import { Input } from "./input.js"
import { Textarea } from "./textarea.js"

/* InputGroup — a control with addons welded to it.
   ---------------------------------------------------------------------------
   0.11's `InputGroup` took `before` and `after` nodes and wrapped each in a
   bordered addon; the children carried the borders and overlapped by a pixel so
   the seam read as one rule. The absorbed group carries the border **itself**
   and un-borders what is inside, which is the better mechanism: no negative
   margins, no `z-index` shuffle to raise the focused member, and an addon can
   sit above or below the control rather than only beside it.

   Both markups ship. `input-group.css` tells them apart by whether the group has
   a `> .ds-input-group__addon` child, because two committed fixtures render the
   0.11 form and nothing re-classes them.

   Two of batch 7's six dedupe exceptions are resolved here: `InputGroupInput`
   and `InputGroupTextarea` kept `border-0` (and the textarea also `py-2.5` and
   a `--textarea-chrome` override) as literal Tailwind so `tailwind-merge` could
   dedupe them against `Input`'s and `Textarea`'s own literal defaults. There is
   no `tailwind-merge` here, so each is a real declaration on its own class —
   which is what let `input.css` and `textarea.css` bake their boxes at all.

   The addon forwards a click to the control, so the whole strip is one hit
   target for focusing the field — except on a button inside it, which has its
   own job. Recipe for the `before`/`after` props is in
   `docs/migration/from-0.11.md`. */

export type InputGroupAlign =
  | "inline-start"
  | "inline-end"
  | "block-start"
  | "block-end"

/* The axis belongs to the addon, not the group: it positions the addon within
   the group, and the two block alignments turn the group into a column. Every
   option resolves to no class of its own — the styling is keyed off
   `data-align` in CSS — but the declaration stays cva-shaped so the docs site's
   build-time extractor still finds the axis (ADR 0001, react/lib/variants.ts).
   Same call `marker` and `navigation-menu` made. */
const inputGroupAddonVariants = variants("ds-input-group-addon", {
  variants: {
    align: {
      "inline-start": "",
      "inline-end": "",
      "block-start": "",
      "block-end": "",
    },
  },
  defaultVariants: { align: "inline-start" },
})

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cx("ds-input-group", className)}
      {...props}
    />
  )
}

function InputGroupAddon({
  className,
  align = "inline-start",
  onClick,
  ...props
}: React.ComponentProps<"div"> & { align?: InputGroupAlign }) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={inputGroupAddonVariants({ align, className })}
      onClick={(event) => {
        onClick?.(event)
        if ((event.target as HTMLElement).closest("button")) return
        event.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

export type InputGroupButtonSize = "xs" | "sm" | "icon-xs" | "icon-sm"

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> & {
  size?: InputGroupButtonSize
  type?: "button" | "submit" | "reset"
}) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cx("ds-input-group-button", className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cx("ds-input-group-text", className)} {...props} />
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cx("ds-input-group-input", className)}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cx("ds-input-group-textarea", className)}
      {...props}
    />
  )
}

export {
  inputGroupAddonVariants,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}