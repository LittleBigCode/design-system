"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"

/* Stepper — progress through an ordered set of steps.
   ---------------------------------------------------------------------------
   THIS COMPONENT RENDERS THE INCUMBENT'S CLASSES ON PURPOSE.

   stepper.css is a cross-boundary pin: `Wizard`, which does not move in this
   migration, renders the whole .ds-stepper__marker / __label / __step block
   itself. So the stylesheet is held and the React is what changes — the parts
   API below is the source's, but every class it emits is 0.11's. Renaming the
   grammar to .ds-stepper-item / -indicator would have silently unstyled Wizard.

   Two consequences a reader should not have to reconstruct:

     - There is no StepperSeparator. The connector between markers is drawn by
       `.ds-stepper__step::after`, so a separator element would be markup that
       styles nothing. Recorded in docs/absorption/corrections.md.
     - The completed check is a `::after` on the marker, not an icon, so
       StepperIndicator takes the step number as its child and the stylesheet
       swaps it out. That is also why nothing here imports CheckIcon.

   `state` maps onto the incumbent's `is-active` / `is-complete` state classes
   rather than a data attribute, for the same reason.

   The source also made the horizontal rail a tab stop, against axe's
   `scrollable-region-focusable`: its own CSS let the row overflow, and a rail
   with nothing focusable inside it is then unreachable by keyboard. That does
   not apply here. The held stylesheet gives every step `flex: 1 1 0` and
   `min-width: 0`, so the row shrinks instead of scrolling, and the tab stop
   would have bought a stop on a container with nothing in it to reach. */
function Stepper({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"ol"> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <ol
      data-slot="stepper"
      data-orientation={orientation}
      className={cx("ds-stepper", className)}
      {...props}
    />
  )
}

function StepperItem({
  className,
  state = "inactive",
  ...props
}: React.ComponentProps<"li"> & {
  state?: "inactive" | "active" | "completed"
}) {
  return (
    <li
      data-slot="stepper-item"
      data-state={state}
      aria-current={state === "active" ? "step" : undefined}
      className={cx(
        "ds-stepper__step",
        state === "active" && "is-active",
        state === "completed" && "is-complete",
        className,
      )}
      {...props}
    />
  )
}

function StepperIndicator({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stepper-indicator"
      className={cx("ds-stepper__marker", className)}
      {...props}
    />
  )
}

/* A transparent wrapper: `display: contents` in stepper.css, so the title and
   description stay direct flex children of the step and keep their spacing. */
function StepperContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stepper-content"
      className={cx("ds-stepper__content", className)}
      {...props}
    />
  )
}

function StepperTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stepper-title"
      className={cx("ds-stepper__label", className)}
      {...props}
    />
  )
}

function StepperDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stepper-description"
      className={cx("ds-stepper__desc", className)}
      {...props}
    />
  )
}

export {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperContent,
  StepperTitle,
  StepperDescription,
}