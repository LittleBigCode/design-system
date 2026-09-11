"use client";

import * as React from "react";

import { Button, type ButtonSize, type ButtonVariant } from "./button.js";

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

   Re-wired onto `Button` in 1.0.0-beta.7 — the second and final half of batch
   3's forward cross-batch import, and the one that clears four other rows with
   it. `SpeedDial`, `AttachmentAction`, `Editable` and `FieldArray` all compose
   *this*, so re-wiring here re-wires them, and each keeps the required `label`
   that made `IconButton` worth having in the first place: an icon-only button
   whose accessible name is checked by the type system rather than remembered.

   `variant` widens from the two the incumbent had to the source's full eight,
   which is the half of the re-wiring that was actually deferred. */

/** The square sizes. `icon` is the 40px default; `icon-xs` is 24px. */
export type IconButtonSize = Extract<
  ButtonSize,
  "icon" | "icon-xs" | "icon-sm" | "icon-lg" | "xs" | "sm" | "lg"
>;

export interface IconButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "aria-label" | "size"> {
  /** The accessible name. Required — that is the point of this component. */
  label: string;
  variant?: ButtonVariant;
  size?: IconButtonSize;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ label, size = "icon", ...rest }, ref) {
    /* Both spellings resolve to the same square: the bare `sm`/`lg` are a
       published 0.x API and `icon-sm`/`icon-lg` are the source's, so `icon-`
       is simply prefixed back on where it is missing. */
    const squareSize = (
      size.startsWith("icon") ? size : `icon-${size}`
    ) as ButtonSize;
    return (
      <Button
        ref={ref}
        data-slot="icon-button"
        aria-label={label}
        title={label}
        size={squareSize}
        {...rest}
      />
    );
  }
);
