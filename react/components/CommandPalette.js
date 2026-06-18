/* ----------------------------------------------------------------------------
   Command palette — a ⌘K-style centered dialog. Renders a .ds-cmdk surface over
   the shared .ds-overlay scrim (see Modal in react/index.js). Filters commands as
   you type, ArrowUp / ArrowDown move the active row, Enter runs it (then closes),
   Escape closes. Portals to <body> and is controlled via `open`.

   commands: [{ id, label, group?, hint?, onRun }]. Wire a global ⌘K listener in
   your app to flip `open` — the component itself stays controlled.
   Styling: css/components/command-palette.css (global stylesheet).
   ---------------------------------------------------------------------------- */
import React from "react";
import { createPortal } from "react-dom";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

export function CommandPalette({ open, onClose, commands = [], placeholder = "Type a command or search…", className }) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);
  const listRef = React.useRef(null);

  // The visible, filtered commands (case-insensitive substring on the label).
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => String(c.label).toLowerCase().includes(q));
  }, [commands, query]);

  // Reset query + selection and focus the input each time the palette opens.
  React.useEffect(() => {
    if (!open) return undefined;
    setQuery("");
    setActive(0);
    const id = requestAnimationFrame(() => {
      if (inputRef.current) inputRef.current.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Keep the active index in range as the filtered list changes.
  React.useEffect(() => {
    setActive((i) => (filtered.length ? Math.min(i, filtered.length - 1) : 0));
  }, [filtered.length]);

  // Scroll the active row into view as it moves.
  React.useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector(".ds-cmdk__item.is-active");
    if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const run = (cmd) => {
    if (!cmd) return;
    if (cmd.onRun) cmd.onRun();
    if (onClose) onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") { e.preventDefault(); onClose && onClose(); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filtered.length) setActive((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filtered.length) setActive((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[active]);
    }
  };

  if (!open) return null;

  // Walk the filtered list once, emitting a group label whenever it changes so
  // groups stay in command order and the flat active-index keeps lining up.
  const rows = [];
  let lastGroup;
  filtered.forEach((cmd, i) => {
    if (cmd.group != null && cmd.group !== lastGroup) {
      lastGroup = cmd.group;
      rows.push(h("div", { key: `g-${i}`, className: "ds-cmdk__group-label" }, cmd.group));
    }
    rows.push(h("button", {
      key: cmd.id != null ? cmd.id : i,
      type: "button",
      role: "option",
      "aria-selected": i === active,
      className: cx("ds-cmdk__item", i === active && "is-active"),
      onMouseEnter: () => setActive(i),
      onClick: () => run(cmd),
    },
      h("span", { className: "ds-cmdk__label" }, cmd.label),
      cmd.hint != null ? h("span", { className: "ds-cmdk__hint" }, cmd.hint) : null
    ));
  });

  const node = h("div", {
    className: "ds-overlay is-open",
    onClick: (e) => { if (e.target === e.currentTarget) onClose && onClose(); },
  },
    h("div", {
      className: cx("ds-cmdk", className),
      role: "dialog", "aria-modal": "true", "aria-label": "Command palette",
      onKeyDown,
    },
      h("input", {
        ref: inputRef,
        className: "ds-cmdk__input",
        type: "text",
        role: "combobox",
        // A combobox needs an accessible name (placeholder is not one) and a
        // pointer to the listbox it controls.
        "aria-label": "Search commands",
        "aria-controls": "ds-cmdk-list",
        "aria-expanded": true,
        "aria-autocomplete": "list",
        placeholder,
        value: query,
        onChange: (e) => setQuery(e.target.value),
      }),
      h("div", { ref: listRef, id: "ds-cmdk-list", className: "ds-cmdk__list", role: "listbox", "aria-label": "Commands" },
        filtered.length
          ? rows
          : h("div", { className: "ds-cmdk__empty" }, "No results.")
      )
    )
  );
  return createPortal(node, document.body);
}
