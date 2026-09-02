"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { XIcon } from "@phosphor-icons/react"

import { IconButton } from "./icon-button.js"
import { bcx } from "../lib/baseClass.js"
import { cx } from "../lib/cx.js"

// A floating action button whose actions fan out on open, ported from daisyUI's
// `fab` (https://daisyui.com/components/fab/). daisyUI builds it out of CSS
// alone: a `tabindex="0"` div plus `:focus-within`, which has no Escape, no
// focus return and no menu role. That mechanism is dropped for Base UI's Menu —
// the same primitive a dropdown menu runs on — so the keyboard contract comes
// free and only the layout is ported.
//
// The trigger is the root: it carries the positioning, so `className` moves the
// dial. `.ds-speed-dial` is `fixed`, which is what a FAB wants; a demo or a
// scoped region swaps in `.ds-speed-dial--docked` to dock it inside a
// positioned ancestor. The source kept those as literal Tailwind utilities so
// tailwind-merge could dedupe the override; there is no tailwind-merge here.
function SpeedDial({
  label,
  icon,
  tone,
  children,
  side = "top",
  sideOffset = 8,
  className,
  ...props
}: Omit<MenuPrimitive.Root.Props, "children"> & {
  /** `SpeedDialAction`s, revealed on open. */
  children?: React.ReactNode
  /** Accessible name for the trigger, which has no visible text. */
  label: string
  /** The closed-state glyph. Swapped for an X while open. */
  icon?: React.ReactNode
  /** Re-wired onto `IconButton`'s `variant` until batch 7 lands the source's
   *  eight-tone `Button`. The incumbent has two. */
  tone?: "primary" | "danger"
  /** Which way the column fans out. `align` is fixed to the trigger's end
   *  edge — that edge is what the action boxes line up against. */
  side?: "top" | "bottom"
  sideOffset?: number
  className?: string
}) {
  return (
    <MenuPrimitive.Root {...props}>
      <MenuPrimitive.Trigger
        render={
          <IconButton
            data-slot="speed-dial"
            variant={tone}
            label={label}
            className={cx("ds-speed-dial", className)}
          >
            {/* Both glyphs render and CSS picks one: `aria-expanded` lands on
                the trigger, so the swap needs no open state of its own. */}
            <span className="ds-speed-dial-icon">{icon}</span>
            <XIcon className="ds-speed-dial-icon-close" />
          </IconButton>
        }
      />
      <MenuPrimitive.Portal>
        <MenuPrimitive.Positioner
          className="ds-speed-dial-positioner"
          side={side}
          align="end"
          sideOffset={sideOffset}
        >
          <MenuPrimitive.Popup
            data-slot="speed-dial-actions"
            className="ds-speed-dial-actions"
          >
            {children}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  )
}

// One action: its label as a plate and its glyph in a box the size of the
// trigger, so the column lines up under the dial. The whole row is the
// menuitem — the visible label is the accessible name, which is why the glyph
// needs none of its own.
function SpeedDialAction({
  icon,
  children,
  className,
  ...props
}: MenuPrimitive.Item.Props & {
  icon?: React.ReactNode
}) {
  return (
    <MenuPrimitive.Item
      data-slot="speed-dial-action"
      className={bcx("ds-speed-dial-action", className)}
      {...props}
    >
      {/* The plate is the quiet half and the box the loud one, so the column
          reads as buttons under the trigger rather than as a stack of chips. */}
      <span className="ds-speed-dial-action-label">{children}</span>
      {/* On the button classes rather than hand-picked tokens, so the box sits
          on the same fill scale as the trigger — a raw ink fill reads louder
          than any button in the system once dark mode inverts it. It is a span,
          not a button: the whole row is already the menu item. */}
      <span className="ds-button ds-button--icon ds-speed-dial-action-icon">
        {icon}
      </span>
    </MenuPrimitive.Item>
  )
}

export { SpeedDial, SpeedDialAction }
