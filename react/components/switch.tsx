"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { bcx } from "../lib/baseClass.js"

/* Switch — a two-state toggle.
   ---------------------------------------------------------------------------
   Moved out of `react/index.tsx` in 1.0.0-beta.7. Base UI's Switch underneath,
   which is what the applier did not have: the state is `data-checked` on a
   `role="switch"` button rather than a hidden checkbox, so the thumb can be
   transitioned independently and a screen reader gets "switch, on" rather than
   "checkbox, checked".

   The trade is that Base UI's root is the *track*, while 0.11's `.ds-switch` is
   the *label* around a hidden input. Both markups ship — `<ds-switch>` writes
   0.11's and it is frozen — and `switch.css` tells them apart by whether the
   root has a `.ds-switch__track` child.

   0.11's `children` became a label beside the switch; here it is a `<Label
   htmlFor>` the caller writes, which is the same association done explicitly.
   The recipe is in `docs/migration/from-0.11.md`. */

export interface SwitchProps extends SwitchPrimitive.Root.Props {
  size?: "default" | "sm"
}

function Switch({ className, size = "default", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={bcx("ds-switch", className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className="ds-switch-thumb" />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
