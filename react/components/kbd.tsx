"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"

/* Kbd — an inline keycap. `KbdGroup` chains several into a chord ("⌘ + K").
   ---------------------------------------------------------------------------
   The group is a <kbd> too, not a <div>: nesting <kbd> is valid and it keeps a
   chord one keyboard-input phrase to a screen reader rather than several. */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-slot="kbd" className={cx("ds-kbd", className)} {...props} />
}

function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cx("ds-kbd-group", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }