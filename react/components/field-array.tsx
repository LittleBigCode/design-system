"use client";

import * as React from "react";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";

import { cx } from "../lib/cx.js";
import { Button } from "../index.js";
import { IconButton } from "./icon-button.js";

/* FieldArray — repeat chrome for an array of objects.
   ---------------------------------------------------------------------------
   One bordered block per entry, one add button under the stack. Every part is
   separate and holds nothing — no state, no opinion about what an entry
   contains — so an entry takes any control in any arrangement, and the array
   itself lives with the consumer, because this package owns no form state.

   Submission needs no state beyond the row list: index each control's own
   `name` per entry (`diplomas[0].school`) and a plain form submit carries the
   whole array. Keys must key off a stable entry id rather than the index —
   keyed by index, removing a row makes React reuse the wrong DOM node and the
   values below it shift up by one.

   The two dedupe exceptions this batch owed on this file are resolved in
   field-array.css: `flex items-center` on the item and `flex` on the content
   are real declarations there, and the demos' `flex-col`, `items-stretch` and
   `grid` overrides are the `--stacked`, `--stretch` and `--grid` modifiers. No
   literal crosses over.

   `Button` and `IconButton` were batch 3's forward cross-batch imports, and
   both are re-wired **back** in 1.0.0-beta.7: `IconButton` now composes
   `Button` itself, so the remove control reaches the source's symbol through
   it and keeps the required `label`. The add button still passes no variant —
   a bare `.ds-button` is this system's bordered button, which is what the
   source spells `outline`. */
function FieldArray({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="field-array"
      className={cx("ds-field-array", className)}
      {...props}
    />
  );
}

function FieldArrayItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-array-item"
      className={cx("ds-field-array-item", className)}
      {...props}
    />
  );
}

function FieldArrayItemContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-array-item-content"
      className={cx("ds-field-array-item-content", className)}
      {...props}
    />
  );
}

function FieldArrayRemove({
  label = "Remove",
  children,
  ...props
}: Omit<React.ComponentProps<typeof IconButton>, "label"> & {
  label?: string;
}) {
  return (
    <IconButton
      size="icon-sm"
      label={label}
      data-slot="field-array-remove"
      {...props}
    >
      {children ?? <TrashIcon />}
    </IconButton>
  );
}

function FieldArrayAdd({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      data-slot="field-array-add"
      className={cx("ds-field-array-add", className)}
      {...props}
    >
      <PlusIcon />
      {children}
    </Button>
  );
}

export {
  FieldArray,
  FieldArrayItem,
  FieldArrayItemContent,
  FieldArrayRemove,
  FieldArrayAdd,
};
