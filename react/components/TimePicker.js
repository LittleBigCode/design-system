/* ----------------------------------------------------------------------------
   Time picker — a .ds-input that opens an HH:MM popover.
   The popover holds two scrollable columns: hours (00–23) and minutes (00–55 in
   `step` increments). Clicking an hour and a minute writes "HH:MM" into the
   field; the field also accepts typed input and normalises it on blur. Closes on
   outside-click and Escape. Works controlled (value/onChange) or uncontrolled
   (defaultValue). All time math is plain JS — no libraries.
   Styling: css/components/time-picker.css.
   ---------------------------------------------------------------------------- */
import React from "react";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

const pad = (n) => String(n).padStart(2, "0");

/* Parse a loose "H:M" / "HH:MM" into { hour, minute } clamped to range, or null. */
function parse(v) {
  if (v == null || v === "") return null;
  const m = /^(\d{1,2}):(\d{1,2})$/.exec(String(v).trim());
  if (!m) return null;
  let hour = Number(m[1]);
  let minute = Number(m[2]);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return { hour, minute };
}

const format = (t) => (t ? `${pad(t.hour)}:${pad(t.minute)}` : "");

export function TimePicker({
  value,
  defaultValue,
  onChange,
  step = 5,
  placeholder = "hh:mm",
  disabled,
  name,
  className,
  ...rest
}) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(() => format(parse(defaultValue)));
  const current = controlled ? value : internal;
  const time = parse(current);

  const [open, setOpen] = React.useState(false);
  // Draft text while typing in the field; committed (normalised) on blur.
  const [draft, setDraft] = React.useState(() => current || "");

  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const hourRef = React.useRef(null);
  const minuteRef = React.useRef(null);

  const hours = React.useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = React.useMemo(() => {
    const s = Math.max(1, Math.min(60, Math.round(step) || 5));
    const out = [];
    for (let m = 0; m < 60; m += s) out.push(m);
    return out;
  }, [step]);

  // Keep the shown text in sync with the value when not actively editing.
  React.useEffect(() => {
    setDraft(current || "");
  }, [current]);

  // Outside-click + Escape close.
  React.useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        if (inputRef.current && inputRef.current.focus) inputRef.current.focus();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // When opening, scroll the chosen hour / minute into view.
  React.useEffect(() => {
    if (!open) return;
    const sel = (col) => col && col.querySelector(".is-selected");
    requestAnimationFrame(() => {
      const sh = sel(hourRef.current);
      const sm = sel(minuteRef.current);
      if (sh) sh.scrollIntoView({ block: "center" });
      if (sm) sm.scrollIntoView({ block: "center" });
    });
  }, [open]);

  function setValue(next) {
    const str = format(next);
    if (!controlled) setInternal(str);
    onChange && onChange(str);
  }

  function pickHour(hr) {
    setValue({ hour: hr, minute: time ? time.minute : 0 });
  }
  function pickMinute(mn) {
    setValue({ hour: time ? time.hour : 0, minute: mn });
  }

  function commitDraft() {
    const parsed = parse(draft);
    if (parsed) {
      setValue(parsed);
    } else if (draft === "") {
      setValue(null);
    } else {
      // Reject unparseable text — snap back to the last valid value.
      setDraft(current || "");
    }
  }

  return h("div", {
    ref: rootRef,
    className: cx("ds-timepicker", className),
    ...rest,
  },
    h("input", {
      ref: inputRef,
      type: "text",
      className: "ds-input",
      value: draft,
      placeholder,
      disabled: disabled || undefined,
      name,
      inputMode: "numeric",
      autoComplete: "off",
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      onChange: (e) => setDraft(e.target.value),
      onClick: () => { if (!disabled) setOpen(true); },
      onFocus: () => { if (!disabled) setOpen(true); },
      onBlur: commitDraft,
      onKeyDown: (e) => {
        if (disabled) return;
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true);
        } else if (e.key === "Enter") {
          e.preventDefault();
          commitDraft();
          setOpen(false);
        }
      },
    }),
    open
      ? h("div", {
          className: "ds-timepicker__popover",
          role: "dialog",
          "aria-label": "Choose time",
        },
          h("div", { className: "ds-timepicker__col", ref: hourRef, role: "listbox", "aria-label": "Hour" },
            hours.map((hr) =>
              h("button", {
                key: `h-${hr}`,
                type: "button",
                role: "option",
                "aria-selected": time ? time.hour === hr : false,
                className: cx("ds-timepicker__opt", time && time.hour === hr && "is-selected"),
                // mousedown so we set the value before the field's blur fires.
                onMouseDown: (e) => { e.preventDefault(); pickHour(hr); },
              }, pad(hr))
            )
          ),
          h("div", { className: "ds-timepicker__col", ref: minuteRef, role: "listbox", "aria-label": "Minute" },
            minutes.map((mn) =>
              h("button", {
                key: `m-${mn}`,
                type: "button",
                role: "option",
                "aria-selected": time ? time.minute === mn : false,
                className: cx("ds-timepicker__opt", time && time.minute === mn && "is-selected"),
                onMouseDown: (e) => { e.preventDefault(); pickMinute(mn); },
              }, pad(mn))
            )
          )
        )
      : null
  );
}
