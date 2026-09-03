"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"

/* Button — the system's action, and the surface with the most readers.
   ---------------------------------------------------------------------------
   Moved out of `react/index.tsx` in 1.0.0-beta.7, where it had lived since 0.x,
   for the same reason `Banner` moved out in beta.6: it stopped being four lines
   and started being a component with three axes.

   `<ds-button>` writes `ds-button--${variant}` by string concatenation, so the
   whole modifier family is a contract (css-ledger §1) — which is why
   `--primary` and `--danger` survive alongside the source's `--default` and
   `--destructive` rather than being renamed into them. `primary` and `default`
   resolve to the same rule; `danger` and `destructive` do not, and both stay:
   0.11's danger is a bordered warning, the source's is a tinted one.

   `variant` has no default, and that is deliberate: `<ds-button>` with no
   attribute renders a bare `class="ds-button"`, which is 0.11's white,
   ink-bordered button. Defaulting to the source's solid `default` would make
   the same absence of a prop render two different buttons depending on which
   binding you used. `default` is still there by name.

   `size` is the source's eight-value prop over 0.11's four classes. The source
   spells them `size-sm`, `size-icon-lg`; this package already had `--sm`,
   `--lg`, `--icon`, `--xs`, all of them frozen and all of them defined in
   `button-extras.css`. So the prop is the source's and the class is 0.11's,
   with `icon-` stripped to a modifier pair — exactly the mapping
   `icon-button.tsx` has been doing since beta.3.

   `loading` and `block` are 0.11's and have no source equivalent. `loading`
   also disables: a button that is working is not a button you press twice.

   Base UI's `Button` underneath, which is what the applier did not have: it
   keeps a disabled button focusable so a screen reader can still reach it and
   read why it is disabled, instead of removing it from the tab order. */

/** Visual variant. `primary` and `default` are the same button. */
export type ButtonVariant =
  | "default"
  | "primary"
  | "outline"
  | "secondary"
  | "ghost"
  | "danger"
  | "destructive"
  | "link"

/** Brand fill. Sets the variant rules' `--btn` / `--btn-fg` pair, so a tone
 *  works across solid, outline and ghost alike. */
export type ButtonTone =
  | "black"
  | "red"
  | "brown"
  | "khaki"
  | "beige"
  | "green"
  | "blue"
  | "yellow"

export type ButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"

/* Declared through `variants()` rather than cva (ADR 0001), and cva-shaped on
   purpose: the docs site parses these axes out of this file at build time to
   drive the playground's control panel. `size` is not among them — its classes
   are not one-to-one with its options, so it is resolved below. */
const buttonVariants = variants("ds-button", {
  variants: {
    variant: {
      default: "ds-button--default",
      primary: "ds-button--primary",
      outline: "ds-button--outline",
      secondary: "ds-button--secondary",
      ghost: "ds-button--ghost",
      danger: "ds-button--danger",
      destructive: "ds-button--destructive",
      link: "ds-button--link",
    },
    tone: {
      black: "ds-button--tone-black",
      red: "ds-button--tone-red",
      brown: "ds-button--tone-brown",
      khaki: "ds-button--tone-khaki",
      beige: "ds-button--tone-beige",
      green: "ds-button--tone-green",
      blue: "ds-button--tone-blue",
      yellow: "ds-button--tone-yellow",
    },
  },
  /* No defaults on purpose. `<ds-button>` with no `variant` attribute renders
     a bare `class="ds-button"`, and that bare class is 0.11's white,
     ink-bordered button. Defaulting `variant` to the source's solid `default`
     would make `<Button />` and `<ds-button>` render differently from the same
     absence of a prop — on the package's most frozen surface. So an omitted
     variant emits no modifier and the base rule paints, which is what every
     existing caller already gets. `default` is still available by name, and is
     the same rule as `primary`. */
  defaultVariants: {},
})

/** `icon-sm` is two classes, `default` is none — which is why size is resolved
 *  here rather than declared as a third axis above. */
function sizeClasses(size: ButtonSize): string | undefined {
  if (size === "default") return undefined
  const step = size.replace(/^icon-?/, "")
  return cx(size.startsWith("icon") && "ds-button--icon", step && `ds-button--${step}`)
}

export interface ButtonProps extends Omit<ButtonPrimitive.Props, "className"> {
  variant?: ButtonVariant
  tone?: ButtonTone
  size?: ButtonSize
  /** Shows a spinner in place of the label and disables the button. */
  loading?: boolean
  /** Full-width. */
  block?: boolean
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    tone,
    size = "default",
    loading,
    block,
    type = "button",
    disabled,
    ...props
  },
  ref
) {
  return (
    <ButtonPrimitive
      ref={ref}
      type={type}
      data-slot="button"
      disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      className={buttonVariants({
        variant,
        tone,
        className: cx(
          sizeClasses(size),
          loading && "ds-button--loading",
          block && "ds-button--block",
          className
        ),
      })}
      {...props}
    />
  )
})

export { Button, buttonVariants }
