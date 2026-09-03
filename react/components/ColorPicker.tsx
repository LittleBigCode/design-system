"use client"

import { cx } from "../lib/cx.js";
/* ----------------------------------------------------------------------------
   Color picker — a flat .ds-colorpicker pairing a swatch grid with a hex input
   and a native <input type=color>. Clicking a swatch, editing the hex field, or
   moving the native picker all converge on one value. Works controlled
   (value/onChange) or uncontrolled (defaultValue). The default swatches are the
   Diametral brand palette plus white. Styling: css/components/color-picker.css.
   ---------------------------------------------------------------------------- */
import React from "react";

import type { HTMLAttributes } from "react";

/** The Diametral brand palette (charter-canonical) plus white. */

export interface ColorPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled value — a hex color string (e.g. `#ff2a00`). */
  value?: string;
  /** Uncontrolled initial value — a hex color string. Defaults to `#161616`. */
  defaultValue?: string;
  /** Fires with the new hex color when a swatch, the hex field, or the native input changes. */
  onChange?: (value: string) => void;
  /** Swatch colors to display. Defaults to {@link BRAND_SWATCHES}. */
  swatches?: string[];
  /** Disable the control. */
  disabled?: boolean;
  /** Name forwarded to the hex input. */
  name?: string;
}

const h = React.createElement;

/* Brand palette (charter-canonical) + white. */
export const BRAND_SWATCHES = [
  "#161616", "#767884", "#9f8667", "#aab0a6", "#d5d3c4",
  "#f4fbda", "#ff2a00", "#23e2ff", "#53ff64", "#fff73b", "#ffffff",
];

/* Is `s` a complete #rgb or #rrggbb hex? (used to gate the native input). */
const isHex = (s: any) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(s || ""));

/* Normalize a hex to lowercase #rrggbb for value comparison (so #FFF === #ffffff). */
function normHex(s: any) {
  let v = String(s || "").trim().toLowerCase();
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(v)) return v;
  if (v.length === 4) v = `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
  return v;
}

export function ColorPicker({
  value,
  defaultValue = "#161616",
  onChange,
  swatches = BRAND_SWATCHES,
  disabled,
  name,
  className,
  ...rest
}: ColorPickerProps) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = controlled ? value : internal;

  // Draft hex text — lets the user type freely (e.g. "#16") without forcing a
  // value until it parses; resyncs whenever the external value changes.
  const [draft, setDraft] = React.useState(current || "");
  React.useEffect(() => { setDraft(current || ""); }, [current]);

  const commit = (next: any) => {
    if (!controlled) setInternal(next);
    if (onChange) onChange(next);
  };

  const onHexInput = (e: any) => {
    const raw = e.target.value;
    setDraft(raw);
    const v = raw.startsWith("#") ? raw : `#${raw}`;
    if (isHex(v)) commit(normHex(v));
  };
  const onHexBlur = () => { setDraft(current || ""); };

  const nativeValue = isHex(current) ? normHex(current) : "#000000";
  const selectedNorm = normHex(current);

  /* Roving tabindex: the group is one tab stop and the arrows move inside it,
     so Tab does not have to walk every swatch to reach the hex field. The stop
     follows the selection, falling back to the first swatch when the current
     value is not one of them. */
  const swatchRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = swatches.findIndex((sw) => normHex(sw) === selectedNorm);
  const tabStop = selectedIndex === -1 ? 0 : selectedIndex;

  /* Arrows select as they move, the way a radio group does — the swatches are
     mutually exclusive, so focus without selection would leave aria-pressed
     describing a swatch the user is no longer on. Both axes wrap, because the
     grid reflows and a row is not a fixed length. */
  const onSwatchKeyDown = (e: any, index: number) => {
    const last = swatches.length - 1;
    let next;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    swatchRefs.current[next]?.focus();
    commit(normHex(swatches[next]));
  };

  return h("div", {
    className: cx("ds-colorpicker", className),
    ...rest,
  },
    h("div", { className: "ds-colorpicker__swatches", role: "group", "aria-label": "Color swatches" },
      swatches.map((sw, i) => {
        const norm = normHex(sw);
        const isSel = norm === selectedNorm;
        return h("button", {
          key: sw,
          ref: (el: HTMLButtonElement | null): void => { swatchRefs.current[i] = el; },
          type: "button",
          className: cx("ds-colorpicker__swatch", isSel && "is-selected"),
          style: { background: sw },
          disabled: disabled || undefined,
          tabIndex: i === tabStop ? 0 : -1,
          "aria-pressed": isSel,
          "aria-label": sw,
          title: sw,
          onClick: () => commit(norm),
          onKeyDown: (e: any) => onSwatchKeyDown(e, i),
        });
      })
    ),
    h("div", { className: "ds-colorpicker__row" },
      h("input", {
        type: "text",
        className: "ds-input",
        value: draft,
        placeholder: "#000000",
        spellCheck: false,
        autoComplete: "off",
        disabled: disabled || undefined,
        name,
        "aria-label": "Hex color",
        onChange: onHexInput,
        onBlur: onHexBlur,
      }),
      h("input", {
        type: "color",
        className: "ds-colorpicker__native",
        value: nativeValue,
        disabled: disabled || undefined,
        "aria-label": "Pick a color",
        onChange: (e) => commit(normHex(e.target.value)),
      })
    )
  );
}