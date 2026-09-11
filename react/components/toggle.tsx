"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";

import { bcx } from "../lib/baseClass.js";
import { variants } from "../lib/variants.js";

/* Toggle — one button that is pressed or not.
   ---------------------------------------------------------------------------
   Not `Segmented`. Segmented is a group of mutually exclusive cells with a
   selected one; this is a single two-state button — bold, italic, mute, a
   filter chip that stays down. The react-ledger withdrew the `Segmented` alias
   for exactly that reason: no target symbol renders a standalone toggle.

   State is `aria-pressed`, which Base UI sets, and the pressed fill is keyed to
   that attribute in toggle.css rather than to a class — so the look follows the
   ARIA contract instead of shadowing it. */
const toggleVariants = variants("ds-toggle", {
  variants: {
    variant: {
      default: "ds-toggle--default",
      outline: "ds-toggle--outline",
    },
    size: {
      default: "ds-toggle--size-default",
      sm: "ds-toggle--size-sm",
      lg: "ds-toggle--size-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "default" | "sm" | "lg";

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & {
  variant?: ToggleVariant;
  size?: ToggleSize;
}) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={bcx(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
