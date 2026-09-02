"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import {
  CaretDownIcon,
  CheckIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react"

import { cx } from "../lib/cx.js"
import { Button, Segmented } from "../index.js"
import { IconButton } from "./ButtonExtras.js"

/* ThemeSwitcher — three modes in one of three footprints.

   Fully controlled: the theme itself (storage, media-query sync, system
   resolution) is app wiring, not the design system's job — the consumer owns a
   useTheme()-style hook and passes it straight through. All three variants
   share that contract; they differ only in footprint.

   Three re-wirings, two of them onto held components:

   - `segmented` sat on the source's `toggle-group`, which is held. It is
     re-composed onto this repo's `Segmented`. Two consequences worth naming:
     the source's sliding `.ds-theme-switcher-indicator` does not survive —
     it was a hand-pitched translate over `w-9` toggle cells and
     `.ds-segmented__item.is-active` already owns the pressed fill — and the
     cells now carry visible text beside the glyph. The source's cells were
     icon-only with a per-item `aria-label`, and `Segmented` takes a label
     node, not an aria-label; a visible word is the better answer either way,
     and `.ds-segmented__item` is a text control in this system. The group's
     own accessible name moves to a `role="group"` wrapper, which is also where
     the pass-through props land — `Segmented` renders a bare div.
   - `cycle` sat on the source's `Button` at `size="icon-sm"`. That is
     `IconButton` here, whose `label` is the accessible name the action needs.
   - `dropdown` sat on the source's `dropdown-menu`, also held. This repo's
     `Dropdown` is click-toggled with no radio rows, which is exactly why the
     react-ledger withdrew the `MenuItem` alias, so the re-wiring goes to Base
     UI's `Menu` — the primitive the source's own dropdown-menu wraps — wearing
     this repo's `.ds-menu` vocabulary. Same move batch 1's menubar made.

   Batch 7 supplies `Button` and re-wires the `cycle` trigger back. */
type ThemeSwitcherMode = "light" | "dark" | "system"

const MODES = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
] satisfies { value: ThemeSwitcherMode; label: string; Icon: typeof SunIcon }[]

function ThemeSwitcher({
  value,
  onValueChange,
  variant = "segmented",
  className,
  ...props
}: {
  value: ThemeSwitcherMode
  onValueChange: (value: ThemeSwitcherMode) => void
  variant?: "segmented" | "cycle" | "dropdown"
} & Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "defaultValue" | "defaultChecked"
>) {
  const index = MODES.findIndex((mode) => mode.value === value)
  const current = MODES[index]

  if (variant === "cycle") {
    // The icon reports the CURRENT mode (state, like the segmented cells);
    // the accessible name announces the ACTION, since clicking advances.
    const next = MODES[(index + 1) % MODES.length]
    return (
      <IconButton
        data-slot="theme-switcher"
        data-variant="cycle"
        size="sm"
        label={`Switch to ${next.label.toLowerCase()} theme`}
        className={className}
        {...props}
        onClick={() => onValueChange(next.value)}
      >
        <current.Icon weight="fill" />
      </IconButton>
    )
  }

  if (variant === "dropdown") {
    return (
      <MenuPrimitive.Root>
        <MenuPrimitive.Trigger
          render={
            <Button
              data-slot="theme-switcher"
              data-variant="dropdown"
              size="sm"
              aria-label="Theme"
              className={cx("ds-theme-switcher-dropdown-trigger", className)}
              {...props}
            />
          }
        >
          <current.Icon weight="fill" />
          <CaretDownIcon
            aria-hidden
            className="ds-theme-switcher-dropdown-icon"
          />
        </MenuPrimitive.Trigger>
        <MenuPrimitive.Portal>
          <MenuPrimitive.Positioner align="end" sideOffset={6}>
            <MenuPrimitive.Popup className="ds-menu">
              <MenuPrimitive.RadioGroup
                value={value}
                onValueChange={(next) =>
                  onValueChange(next as ThemeSwitcherMode)
                }
              >
                {MODES.map(({ value: mode, label, Icon }) => (
                  // Base UI radio items keep the menu open by default (built
                  // for multi-toggling) — a theme pick is one-shot, so close
                  // on click.
                  <MenuPrimitive.RadioItem
                    key={mode}
                    value={mode}
                    closeOnClick
                    className="ds-menu__item ds-theme-switcher-radio-item"
                  >
                    <span className="ds-theme-switcher-check">
                      <MenuPrimitive.RadioItemIndicator>
                        <CheckIcon />
                      </MenuPrimitive.RadioItemIndicator>
                    </span>
                    <Icon />
                    {label}
                  </MenuPrimitive.RadioItem>
                ))}
              </MenuPrimitive.RadioGroup>
            </MenuPrimitive.Popup>
          </MenuPrimitive.Positioner>
        </MenuPrimitive.Portal>
      </MenuPrimitive.Root>
    )
  }

  return (
    <div
      data-slot="theme-switcher"
      data-variant="segmented"
      role="group"
      aria-label="Theme"
      className={cx("ds-theme-switcher", className)}
      {...props}
    >
      <Segmented
        items={MODES.map(({ value: mode, label, Icon }) => ({
          value: mode,
          label: (
            <>
              <Icon
                aria-hidden
                weight={mode === value ? "fill" : "regular"}
              />
              {label}
            </>
          ),
        }))}
        value={value}
        onChange={(next) => onValueChange(next as ThemeSwitcherMode)}
      />
    </div>
  )
}

export { ThemeSwitcher }
export type { ThemeSwitcherMode }
