import * as React from "react"

import { cx } from "../lib/cx.js"

/* Panel — a sunken content panel, composed from parts.
   ---------------------------------------------------------------------------
   Moved out of `react/index.tsx` in 1.0.0-beta.7. `<ds-panel>` writes
   `ds-panel`, `ds-panel--rows` and `ds-panel__title` itself over arbitrary
   light-DOM children, so all three are frozen (css-ledger §1) and the parts are
   renamed into that grammar rather than carrying the source's flat kebab.

   `PanelRow` is what 0.11 spelled as the `rows` boolean: a tight, dividing
   row for settings toggles and key/value pairs. The modifier stays because the
   web component writes it; the part is the better shape because a panel can now
   hold rows *and* prose, which the flag could not express.

   `ruled` on the header and footer replaces the source's `.border-b` /
   `.border-t` — Tailwind utility class names it expected a consumer to add,
   which this package does not define. */

export interface PanelProps extends Omit<React.ComponentProps<"div">, "title"> {
  size?: "default" | "sm"
  /** Tighten the bottom padding for `.ds-input-row` / `<PanelRow>` content. */
  rows?: boolean
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { className, size = "default", rows, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="panel"
      data-size={size}
      className={cx("ds-panel", rows && "ds-panel--rows", className)}
      {...props}
    />
  )
})

function PanelHeader({
  className,
  ruled,
  ...props
}: React.ComponentProps<"div"> & { ruled?: boolean }) {
  return (
    <div
      data-slot="panel-header"
      className={cx("ds-panel__header", ruled && "ds-panel__header--ruled", className)}
      {...props}
    />
  )
}

function PanelTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="panel-title" className={cx("ds-panel__title", className)} {...props} />
  )
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-content"
      className={cx("ds-panel__content", className)}
      {...props}
    />
  )
}

function PanelFooter({
  className,
  ruled,
  ...props
}: React.ComponentProps<"div"> & { ruled?: boolean }) {
  return (
    <div
      data-slot="panel-footer"
      className={cx("ds-panel__footer", ruled && "ds-panel__footer--ruled", className)}
      {...props}
    />
  )
}

function PanelRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="panel-row" className={cx("ds-panel__row", className)} {...props} />
  )
}

export { Panel, PanelHeader, PanelTitle, PanelContent, PanelFooter, PanelRow }
