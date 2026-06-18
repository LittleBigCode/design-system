/* ----------------------------------------------------------------------------
   Color picker — a flat .ds-colorpicker pairing a swatch grid with a hex input
   and a native <input type=color>. Clicking a swatch, editing the hex field, or
   moving the native picker all converge on one value. Works controlled
   (value/onChange) or uncontrolled (defaultValue). The default swatches are the
   Diametral brand palette plus white. Styling: css/components/color-picker.css.
   ---------------------------------------------------------------------------- */
import React from "react";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* Brand palette (charter-canonical) + white. */
export const BRAND_SWATCHES = [
  "#161616", "#767884", "#9f8667", "#aab0a6", "#d5d3c4",
  "#f4fbda", "#ff2a00", "#23e2ff", "#89fc79", "#fff73b", "#ffffff",
];

/* Is `s` a complete #rgb or #rrggbb hex? (used to gate the native input). */
const isHex = (s) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(s || ""));

/* Normalize a hex to lowercase #rrggbb for value comparison (so #FFF === #ffffff). */
function normHex(s) {
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
}) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = controlled ? value : internal;

  // Draft hex text — lets the user type freely (e.g. "#16") without forcing a
  // value until it parses; resyncs whenever the external value changes.
  const [draft, setDraft] = React.useState(current || "");
  React.useEffect(() => { setDraft(current || ""); }, [current]);

  const commit = (next) => {
    if (!controlled) setInternal(next);
    if (onChange) onChange(next);
  };

  const onHexInput = (e) => {
    const raw = e.target.value;
    setDraft(raw);
    const v = raw.startsWith("#") ? raw : `#${raw}`;
    if (isHex(v)) commit(normHex(v));
  };
  const onHexBlur = () => { setDraft(current || ""); };

  const nativeValue = isHex(current) ? normHex(current) : "#000000";
  const selectedNorm = normHex(current);

  return h("div", {
    className: cx("ds-colorpicker", className),
    ...rest,
  },
    h("div", { className: "ds-colorpicker__swatches", role: "group", "aria-label": "Color swatches" },
      swatches.map((sw) => {
        const norm = normHex(sw);
        const isSel = norm === selectedNorm;
        return h("button", {
          key: sw,
          type: "button",
          className: cx("ds-colorpicker__swatch", isSel && "is-selected"),
          style: { background: sw },
          disabled: disabled || undefined,
          "aria-pressed": isSel,
          "aria-label": sw,
          title: sw,
          onClick: () => commit(norm),
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
