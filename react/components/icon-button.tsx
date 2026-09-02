"use client";

import * as React from "react";

import { cx } from "../lib/cx.js";

import type { ButtonHTMLAttributes } from "react";

/* IconButton — a square Button with an accessible name it cannot ship without.
   ---------------------------------------------------------------------------
   The react-ledger rules this *source wins* on the ground that the incumbent is
   a class-applier. On inspection that premise is only half true, in the same way
   §1.1 of the batch plan found for `stat-card`: the source's own file says the
   required `label` "is the whole component", and the incumbent
   (react/components/ButtonExtras.tsx) already required it — the source's
   comment names that incumbent as what it was ported from. So the invariant
   does not change hands; it was never lost.

   What the source really brings is the size vocabulary. Its four square sizes
   include a 24px `icon-xs` this package had no equivalent for, and two
   absorbed components in this batch ask for it (`editable`) or for `icon-sm`
   (`field-array`). Those land, as `.ds-button--xs` in button-extras.css.

   Both spellings are accepted. The source's `icon`/`icon-xs`/`icon-sm`/
   `icon-lg` are the documented ones; the incumbent's bare `sm`/`lg` are a
   published 0.x API with call sites in `examples/`, `docs/components.md` and
   batches 1 and 2, so they keep working rather than being broken for a rename.
   `icon-` is simply stripped, and `icon` alone is the 40px default.

   `variant` still narrows to the two the incumbent has — the source composes
   onto its own six-variant Button, which holds until batch 7. Same narrowing
   batch 1 made for `SpeedDial` and batch 2 for `AttachmentAction`. */

/** The square sizes. `icon` is the 40px default; `icon-xs` is 24px. */
export type IconButtonSize =
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"
  | "xs"
  | "sm"
  | "lg";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  /** The accessible name. Required — that is the point of this component. */
  label: string;
  /** Re-wired onto the incumbent Button's two variants until batch 7 lands the
   *  source's own. `primary` is the source's `default`, `danger` its
   *  `destructive`; omit for the ghost button both call `ghost`. */
  variant?: "primary" | "danger";
  size?: IconButtonSize;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { label, variant, size = "icon", className, type = "button", children, ...rest },
    ref
  ) {
    const step = size.replace(/^icon-?/, "");
    return (
      <button
        ref={ref}
        type={type}
        data-slot="icon-button"
        aria-label={label}
        title={label}
        className={cx(
          "ds-button",
          "ds-button--icon",
          variant && `ds-button--${variant}`,
          step && `ds-button--${step}`,
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
