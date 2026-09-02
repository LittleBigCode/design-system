"use client";

import * as React from "react";
import { CheckIcon, PencilSimpleIcon, XIcon } from "@phosphor-icons/react";

import { cx } from "../lib/cx.js";
import { useControllableValue } from "../hooks/useControllableValue.js";
import { Input } from "../index.js";
import { IconButton } from "./icon-button.js";

/* Editable — click-to-edit text in place.
   ---------------------------------------------------------------------------
   A preview with a pencil beside it, swapped for an input plus confirm and
   cancel while editing. Enter commits, Escape discards, and blur does whichever
   `submitOnBlur` says — the default is commit, which is what a title or a cell
   wants; a form field that must be confirmed passes `false`.

   `onMouseDown` preventDefault on the two buttons is load-bearing: without it
   the button blurs the input first, and the blur handler commits or discards
   before the button's own `onClick` ever runs.

   Two forward cross-batch imports re-wired onto the incumbents, each to be
   paid again in batch 7. `Input` is this package's `.ds-input`. The three
   `Button variant="ghost" size="icon-xs"` calls are `IconButton`, which is the
   same move batch 2 made for `AttachmentAction` — and it is an upgrade here
   too: `IconButton` requires `label`, so each of the three now carries an
   accessible name in the type system rather than by the source remembering to
   pass `aria-label`. */
export interface EditableProps
  extends Omit<
    React.ComponentProps<"div">,
    "onChange" | "defaultValue" | "onSubmit"
  > {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Commit on blur (the default) rather than discard. */
  submitOnBlur?: boolean;
}

function Editable({
  className,
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  onCancel,
  placeholder = "Empty",
  disabled = false,
  submitOnBlur = true,
  ...props
}: EditableProps) {
  const [committed, setCommitted] = useControllableValue<string>({
    value,
    defaultValue,
    onChange: onValueChange,
  });
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(committed);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const startEditing = () => {
    if (disabled) return;
    setDraft(committed);
    setEditing(true);
  };

  const submit = () => {
    setCommitted(draft);
    onSubmit?.(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(committed);
    setEditing(false);
    onCancel?.();
  };

  if (editing) {
    return (
      <div
        data-slot="editable"
        data-editing="true"
        className={cx("ds-editable", className)}
        {...props}
      >
        <Input
          ref={inputRef}
          data-slot="editable-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              submit();
            } else if (event.key === "Escape") {
              event.preventDefault();
              cancel();
            }
          }}
          onBlur={() => (submitOnBlur ? submit() : cancel())}
        />
        <IconButton
          size="icon-xs"
          label="Save"
          onMouseDown={(event) => event.preventDefault()}
          onClick={submit}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          size="icon-xs"
          label="Cancel"
          onMouseDown={(event) => event.preventDefault()}
          onClick={cancel}
        >
          <XIcon />
        </IconButton>
      </div>
    );
  }

  return (
    <div
      data-slot="editable"
      data-editing="false"
      className={cx("ds-editable", className)}
      {...props}
    >
      <span data-slot="editable-preview" data-empty={!committed || undefined}>
        {committed || placeholder}
      </span>
      <IconButton
        size="icon-xs"
        label="Edit"
        disabled={disabled}
        onClick={startEditing}
        className="ds-editable-edit-button"
      >
        <PencilSimpleIcon />
      </IconButton>
    </div>
  );
}

export { Editable };
