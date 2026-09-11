"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"
import { Label } from "./label.js"
import { Separator } from "./separator.js"

/* Field — a label, a control, and everything that explains them.
   ---------------------------------------------------------------------------
   Moved out of `react/index.tsx` in 1.0.0-beta.7, where `Field` was a div with
   an optional `<label>` and `FieldHint` was a span with a colour modifier.
   `field.css` is frozen for `.ds-input-row` (css-ledger §1), so the parts are
   absorbed into that file rather than over it.

   What the parts buy over the two appliers:

   - an **orientation** — vertical, horizontal, or `responsive`, which flips at
     a container width rather than a viewport one, so the same field reads
     correctly in a sidebar and in a full-width form;
   - a **description** and an **error** as real parts, the error with
     `role="alert"` so it is announced when it appears — `FieldHint` was a bare
     span and a screen reader never heard it arrive;
   - `FieldSet` / `FieldLegend`, which are a real `<fieldset>` and `<legend>`,
     so a group of checkboxes finally has a group name.

   `FieldError` accepts an `errors` array as well as children, de-duplicated by
   message, because a validated field usually has a list and rendering the same
   message twice is the common bug. One message renders bare; several render as
   a list.

   `FieldHint` is gone; `FieldDescription` and `FieldError` replace it, and
   `.ds-field__hint` stays defined in `field.css` for hand-written HTML. Recipe
   in `docs/migration/from-0.11.md`. */

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cx("ds-field-set", className)}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cx("ds-field-legend", className)}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cx("ds-field-group", className)}
      {...props}
    />
  )
}

export interface FieldProps extends React.ComponentProps<"div"> {
  orientation?: "vertical" | "horizontal" | "responsive"
}

function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cx("ds-field", className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cx("ds-field-content", className)}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cx("ds-field-label", className)}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cx("ds-field-title", className)}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cx("ds-field-description", className)}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cx("ds-field-separator", className)}
      {...props}
    >
      <Separator className="ds-field-separator-line" />
      {children ? (
        <span
          className="ds-field-separator-content"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      ) : null}
    </div>
  )
}

export interface FieldErrorProps extends React.ComponentProps<"div"> {
  /** Rendered when there are no children. De-duplicated by message; one
   *  message renders bare, several render as a list. */
  errors?: Array<{ message?: string } | undefined>
}

function FieldError({ className, children, errors, ...props }: FieldErrorProps) {
  const content = React.useMemo(() => {
    if (children) return children
    if (!errors?.length) return null

    const unique = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]
    if (unique.length === 1) return unique[0]?.message

    return (
      <ul className="ds-field-error-list">
        {unique.map((error, index) =>
          error?.message ? <li key={index}>{error.message}</li> : null
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) return null

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cx("ds-field-error", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
}
