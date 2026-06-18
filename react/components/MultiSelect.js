import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Multi-select --------------------------------------------------------
   A combobox that holds many chosen values as removable tokens. The control is
   a flex-wrap .ds-multiselect__control box (styled like .ds-input) carrying the
   tokens plus a borderless text input; typing filters `options`, ArrowUp /
   ArrowDown move the active option, click or Enter toggles it, Backspace on an
   empty field removes the last token, Escape or an outside-click closes the
   list. Full ARIA combobox roles (combobox / listbox / option, aria-expanded /
   aria-activedescendant, aria-multiselectable). Controlled (`value`) or
   uncontrolled (`defaultValue`) — the value is a string[].
   Styling: css/components/multi-select.css.

   options: Array<string | { value, label?, disabled? }>. */
function normalize(opt) {
  return typeof opt === "string" ? { value: opt, label: opt } : { label: opt.value, ...opt };
}

let uid = 0;

export const MultiSelect = React.forwardRef(function MultiSelect(
  { options = [], value, defaultValue, onChange, placeholder, disabled, className, id, ...rest },
  ref
) {
  const items = React.useMemo(() => options.map(normalize), [options]);
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? []);
  const selected = controlled ? value : internal;

  const labelFor = React.useCallback(
    (v) => {
      const found = items.find((it) => it.value === v);
      return found ? found.label : v;
    },
    [items]
  );

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(-1);

  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const baseId = React.useMemo(() => id || `ds-multiselect-${++uid}`, [id]);
  const listId = `${baseId}-list`;

  const filtered = React.useMemo(() => {
    if (query === "") return items;
    const q = query.toLowerCase();
    return items.filter((it) => String(it.label).toLowerCase().includes(q));
  }, [items, query]);

  // Outside-click close.
  React.useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  function openList() {
    if (disabled) return;
    setOpen(true);
  }
  function close() {
    setOpen(false);
    setActive(-1);
  }

  function setValues(next) {
    if (!controlled) setInternal(next);
    onChange && onChange(next);
  }

  function toggle(item) {
    if (!item || item.disabled) return;
    const next = selected.includes(item.value)
      ? selected.filter((v) => v !== item.value)
      : [...selected, item.value];
    setValues(next);
    setQuery("");
    // Keep focus in the field so the user can keep typing/toggling.
    if (inputRef.current && inputRef.current.focus) inputRef.current.focus();
  }

  function removeAt(i) {
    setValues(selected.filter((_, idx) => idx !== i));
  }

  function onInput(e) {
    setQuery(e.target.value);
    setOpen(true);
    setActive(-1);
  }

  function onKeyDown(e) {
    const list = filtered.filter((it) => !it.disabled);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) { openList(); return; }
      if (!list.length) return;
      const cur = active < 0 ? -1 : list.findIndex((it) => it.value === filtered[active]?.value);
      const nextItem = list[(cur + 1) % list.length];
      setActive(filtered.indexOf(nextItem));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { openList(); return; }
      if (!list.length) return;
      const cur = active < 0 ? 0 : list.findIndex((it) => it.value === filtered[active]?.value);
      const prevItem = list[(cur - 1 + list.length) % list.length];
      setActive(filtered.indexOf(prevItem));
    } else if (e.key === "Enter") {
      if (open && active >= 0 && filtered[active]) {
        e.preventDefault();
        toggle(filtered[active]);
      }
    } else if (e.key === "Escape") {
      if (open) { e.preventDefault(); close(); }
    } else if (e.key === "Backspace" && query === "" && selected.length) {
      e.preventDefault();
      removeAt(selected.length - 1);
    }
  }

  const activeId = open && active >= 0 && filtered[active] ? `${baseId}-opt-${active}` : undefined;

  return h("div", {
      ref: rootRef,
      className: cx("ds-multiselect", disabled && "is-disabled", className),
      ...rest,
    },
    h("div", {
        className: "ds-multiselect__control",
        onMouseDown: (e) => {
          // Focus the field when clicking blank space (let token buttons work).
          if (e.target === e.currentTarget && inputRef.current) {
            e.preventDefault();
            inputRef.current.focus();
            openList();
          }
        },
      },
      selected.map((v, i) =>
        h("span", { key: `${v}-${i}`, className: "ds-multiselect__token" },
          labelFor(v),
          h("button", {
            className: "ds-multiselect__remove",
            type: "button",
            tabIndex: -1,
            "aria-label": `Remove ${labelFor(v)}`,
            disabled: disabled || undefined,
            onClick: () => removeAt(i),
          }, "×")
        )
      ),
      h("input", {
        ref: (node) => {
          inputRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        },
        id: baseId,
        className: "ds-multiselect__input",
        type: "text",
        role: "combobox",
        autoComplete: "off",
        "aria-expanded": open,
        "aria-controls": listId,
        "aria-autocomplete": "list",
        "aria-activedescendant": activeId,
        placeholder: selected.length === 0 ? placeholder : undefined,
        disabled,
        value: query,
        onChange: onInput,
        onKeyDown,
        onFocus: openList,
        onClick: openList,
      })
    ),
    open
      ? h("ul", { id: listId, className: "ds-multiselect__list", role: "listbox", "aria-multiselectable": true },
          filtered.length === 0
            ? h("li", { className: "ds-multiselect__empty", role: "presentation" }, "No matches")
            : filtered.map((it, i) => {
                const isSel = selected.includes(it.value);
                return h("li", {
                  key: `${it.value}-${i}`,
                  id: `${baseId}-opt-${i}`,
                  className: cx("ds-multiselect__option", i === active && "is-active", isSel && "is-selected"),
                  role: "option",
                  "aria-selected": isSel,
                  "aria-disabled": it.disabled || undefined,
                  // mousedown (not click) so we beat the input's blur/outside-click.
                  onMouseDown: (e) => { e.preventDefault(); toggle(it); },
                  onMouseEnter: () => setActive(i),
                }, it.label);
              })
        )
      : null
  );
});
