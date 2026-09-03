import * as React from "react"

import { cx } from "../lib/cx.js"

/* Card — a flat bordered surface, composed from parts.
   ---------------------------------------------------------------------------
   The 0.11 `Card` took `title`, `media`, `footer` and `clickable` and built the
   regions itself. This is the trade every applier in the migration makes:
   composition replaces configuration, and a card can now hold a description, a
   corner action, and any number of divided blocks — none of which a prop bag
   could express without growing a prop per region.

   `ds-card` is published for hand-written Streamlit HTML and `ds-card--
   clickable`, `ds-card__media` and `ds-card__block` were read by the applier
   itself, so the class grammar is frozen (css-ledger §1). The source's parts
   are renamed into it: `ds-card-header` becomes `__header`, and — the one real
   rename rather than a respelling — `CardContent` renders **`ds-card__body`**,
   because `__body` is what this system already calls that region.

   `CardMedia` and `CardBlock` have no source counterpart and are kept: they are
   the two parts the applier's own class contract already had, and dropping them
   would strand `ds-card__media` and `ds-card__block` with nothing rendering
   them.

   `clickable` survives as a prop rather than becoming a part, because it is not
   a region — it is what the whole card *is*. It carries the `tabIndex` and the
   `role` with it, which is the accessible half a bare class could not.

   The recipe for rebuilding the 0.11 prop shape is in
   `docs/migration/from-0.11.md`. */

export interface CardProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm"
  /** Turn the whole card into a focusable, hover-highlighted affordance. */
  clickable?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, size = "default", clickable, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="card"
      data-size={size}
      className={cx("ds-card", clickable && "ds-card--clickable", className)}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? (props.role ?? "button") : props.role}
      {...props}
    />
  )
})

/** Full-bleed media at the top of the card. Pass an image `src` for the common
 *  case, or any node to wrap. */
function CardMedia({
  className,
  src,
  alt = "",
  children,
  ...props
}: React.ComponentProps<"div"> & { src?: string; alt?: string }) {
  if (src) {
    return <img className={cx("ds-card__media", className)} src={src} alt={alt} />
  }
  return (
    <div data-slot="card-media" className={cx("ds-card__media", className)} {...props}>
      {children}
    </div>
  )
}

function CardHeader({
  className,
  ruled,
  ...props
}: React.ComponentProps<"div"> & { ruled?: boolean }) {
  return (
    <div
      data-slot="card-header"
      className={cx("ds-card__header", ruled && "ds-card__header--ruled", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-title" className={cx("ds-card__title", className)} {...props} />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cx("ds-card__description", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-action" className={cx("ds-card__action", className)} {...props} />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cx("ds-card__body", className)} {...props} />
  )
}

/** A divided region, separated from the one above it by a soft rule. */
function CardBlock({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-block" className={cx("ds-card__block", className)} {...props} />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-footer" className={cx("ds-card__footer", className)} {...props} />
  )
}

export {
  Card,
  CardMedia,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardBlock,
  CardFooter,
}
