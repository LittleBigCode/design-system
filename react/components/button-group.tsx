"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { bcx } from "../lib/baseClass.js";
import { cx } from "../lib/cx.js";
import { variants } from "../lib/variants.js";
import { Separator } from "./separator.js";

/* ButtonGroup — buttons joined into one control.
   ---------------------------------------------------------------------------
   Replaces the one-line applier in ButtonExtras.tsx, which wrapped children in
   a div and left the joining entirely to CSS. This adds the two parts that make
   the group more than a flex row — a text cell and a separator — plus the
   vertical orientation, and keeps `role="group"`.

   Orientation is `data-orientation` on the root, and button-group.css does the
   work from there, which is why the variant map carries empty option values:
   class-variance-authority is not acquired (ADR 0001) and the axis is declared
   through `variants()` only so the docs playground can extract it.

   `ButtonGroupSeparator` is where this batch's TSX dedupe exception was owed —
   and it is already paid. Upstream it kept `bg-input data-horizontal:w-auto
   data-vertical:h-auto` literal so tailwind-merge could dedupe against
   `Separator`'s own literal defaults. Batch 2 landed the sizing half as
   `.ds-separator--auto` when `separator` arrived early for `item`, and the
   colour half needs nothing: `bg-input` and `bg-border` both resolve to
   --ds-rule here, which `.ds-separator` already paints. So the class composes
   and no literal crosses over.

   `separator`'s import is backward and free, per the batch plan's cluster
   constraint: it shipped in batch 2, not here. */
const buttonGroupVariants = variants("ds-button-group", {
  variants: {
    orientation: { horizontal: "", vertical: "" },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type ButtonGroupOrientation = "horizontal" | "vertical";

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & { orientation?: ButtonGroupOrientation }) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation ?? "horizontal"}
      className={buttonGroupVariants({ orientation, className })}
      {...props}
    />
  );
}

/** A non-interactive cell in the group — a unit, a prefix, a count. */
function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      { className: cx("ds-button-group-text", className) },
      props
    ),
    render,
    state: { slot: "button-group-text" },
  });
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={bcx("ds-button-group-separator ds-separator--auto", className)}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};
