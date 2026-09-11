"use client"

import * as React from "react"
import { CaretDownIcon } from "@phosphor-icons/react"

import { Button } from "./button.js"
import { ButtonGroup } from "./button-group.js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu.js"

// One default action with its variants a caret away, ported from v1's
// SplitButton (react/components/ButtonExtras.js). v1 hand-rolled the popover —
// its own open state, an outside-mousedown listener and an Escape handler —
// which is exactly what `DropdownMenu` already does, with focus management and
// typeahead on top, so the menu half is built on that instead.
//
// v1's `variant` and `size` map onto Button's own axes and are forwarded to
// both halves, so the pair always reads as one control.
function SplitButton({
  children,
  onMain,
  menu,
  menuLabel = "More actions",
  variant,
  size,
  tone,
  disabled,
  className,
  ...props
}: React.ComponentProps<typeof ButtonGroup> & {
  /** The default action's label. */
  children?: React.ReactNode
  onMain?: React.MouseEventHandler<HTMLButtonElement>
  /** `DropdownMenuItem`s for the caret half. */
  menu?: React.ReactNode
  /** Accessible name for the caret half, which has no visible text. */
  menuLabel?: string
  variant?: React.ComponentProps<typeof Button>["variant"]
  size?: React.ComponentProps<typeof Button>["size"]
  tone?: React.ComponentProps<typeof Button>["tone"]
  disabled?: boolean
}) {
  return (
    <ButtonGroup data-slot="split-button" className={className} {...props}>
      <Button
        variant={variant}
        size={size}
        tone={tone}
        disabled={disabled}
        onClick={onMain}
      >
        {children}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              data-slot="split-button-caret"
              variant={variant}
              size={size}
              tone={tone}
              disabled={disabled}
              // The caret half is square whatever the main half's size, so it
              // reads as one control rather than a second, wider button.
              className="ds-split-button-caret"
              aria-label={menuLabel}
            >
              <CaretDownIcon className="ds-split-button-caret-icon" />
            </Button>
          }
        />
        <DropdownMenuContent align="end">{menu}</DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

export { SplitButton }