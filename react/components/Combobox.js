import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Combobox / typeahead ------------------------------------------------
   An .ds-input field with a filtered popover list. Type to filter `options`,
   ArrowUp/ArrowDown to move the active option, Enter to select, Escape or an
   outside-click to close. Full ARIA combobox roles (combobox / listbox /
   option, aria-expanded / aria-activedescendant). Controlled (`value`) or
   uncontrolled (`defaultValue`); set `allowCustom` to keep free text that does
   not match an option. Styling: css/components/combobox.css.

   options: Array<string | { value, label?, disabled? }>. */
function normalize(opt) {
  return typeof opt === "string" ? { value: opt, label: opt } : { label: opt.value, ...opt };
}

let uid = 0;

export const Combobox = React.forwardRef(function Combobox(
  { options = [], value, defaultValue, onChange, placeholder, allowCustom, disabled, className, id, ...rest },
  ref
) {
  const items = React.useMemo(() => options.map(normalize), [options]);
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const selected = controlled ? value : internal;

  const labelFor = React.useCallback(
    (v) => {
      const found = items.find((it) => it.value === v);
      return found ? found.label : v;
    },
    [items]
  );

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState(() => (selected != null ? String(labelFor(selected)) : ""));
  const [active, setActive] = React.useState(-1);
  const [typing, setTyping] = React.useState(false);

  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const baseId = React.useMemo(() => id || `ds-combobox-${++uid}`, [id]);
  const listId = `${baseId}-list`;

  // Keep the shown text in sync with the selection while not actively typing.
  React.useEffect(() => {
    if (!typing) setQuery(selected != null && selected !== "" ? String(labelFor(selected)) : "");
  }, [selected, typing, labelFor]);

  const filtered = React.useMemo(() => {
    if (!typing || query === "") return items;
    const q = query.toLowerCase();
    return items.filter((it) => String(it.label).toLowerCase().includes(q));
  }, [items, query, typing]);

  // Outside-click + Escape close.
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
    setTyping(false);
  }

  function commit(item) {
    if (!item || item.disabled) return;
    if (!controlled) setInternal(item.value);
    onChange && onChange(item.value);
    setQuery(String(item.label));
    close();
  }

  function onInput(e) {
    const v = e.target.value;
    setTyping(true);
    setQuery(v);
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
        commit(filtered[active]);
      } else if (open && allowCustom && query !== "") {
        e.preventDefault();
        if (!controlled) setInternal(query);
        onChange && onChange(query);
        close();
      }
    } else if (e.key === "Escape") {
      if (open) { e.preventDefault(); close(); }
    }
  }

  const activeId = open && active >= 0 && filtered[active] ? `${baseId}-opt-${active}` : undefined;

  return h("div", {
      ref: rootRef,
      className: cx("ds-combobox", className),
      ...rest,
    },
    h("input", {
      ref: (node) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      id: baseId,
      className: "ds-combobox__input",
      type: "text",
      role: "combobox",
      autoComplete: "off",
      "aria-expanded": open,
      "aria-controls": listId,
      "aria-autocomplete": "list",
      "aria-activedescendant": activeId,
      placeholder,
      disabled,
      value: query,
      onChange: onInput,
      onKeyDown,
      onFocus: openList,
      onClick: openList,
    }),
    open
      ? h("ul", { id: listId, className: "ds-combobox__list", role: "listbox" },
          filtered.length === 0
            ? h("li", { className: "ds-combobox__empty", role: "presentation" }, "No matches")
            : filtered.map((it, i) =>
                h("li", {
                  key: `${it.value}-${i}`,
                  id: `${baseId}-opt-${i}`,
                  className: cx("ds-combobox__option", i === active && "is-active"),
                  role: "option",
                  "aria-selected": it.value === selected,
                  "aria-disabled": it.disabled || undefined,
                  // mousedown (not click) so we beat the input's blur/outside-click.
                  onMouseDown: (e) => { e.preventDefault(); commit(it); },
                  onMouseEnter: () => setActive(i),
                }, it.label)
              )
        )
      : null
  );
});
