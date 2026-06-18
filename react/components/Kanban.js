/* Kanban — a board of columns holding draggable cards.
   columns: [{ id, title }]   items: [{ id, column, ... }]
   Cards drag between columns (HTML5 DnD); `onMove(itemId, toColumnId)` fires on drop.
   Uncontrolled by default (seeds from `items`); pass `items` updates to control it. */
import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

export function Kanban({
  columns = [], items = [], itemKey = (it) => it.id, renderCard, onMove, className,
}) {
  const [list, setList] = React.useState(items);
  const [overCol, setOverCol] = React.useState(null);
  const dragId = React.useRef(null);

  // Keep internal state in sync if the caller passes new items.
  React.useEffect(() => { setList(items); }, [items]);

  const move = (id, col) => {
    setList((prev) => prev.map((it) => (String(itemKey(it)) === String(id) ? { ...it, column: col } : it)));
    onMove && onMove(id, col);
  };

  return h("div", { className: cx("ds-kanban", className) },
    columns.map((c) => {
      const cards = list.filter((it) => it.column === c.id);
      return h("div", { key: c.id, className: "ds-kanban__col" },
        h("div", { className: "ds-kanban__col-head" },
          h("span", null, c.title),
          h("span", { className: "ds-kanban__count" }, cards.length)
        ),
        h("div", {
          className: cx("ds-kanban__list", overCol === c.id && "is-over"),
          onDragOver: (e) => { e.preventDefault(); if (overCol !== c.id) setOverCol(c.id); },
          onDragLeave: () => setOverCol((o) => (o === c.id ? null : o)),
          onDrop: (e) => { e.preventDefault(); setOverCol(null); if (dragId.current != null) move(dragId.current, c.id); },
        },
          cards.map((it) => h("div", {
            key: itemKey(it),
            className: "ds-kanban__card",
            draggable: true,
            onDragStart: (e) => { dragId.current = itemKey(it); e.dataTransfer.effectAllowed = "move"; },
            onDragEnd: () => { dragId.current = null; },
          }, renderCard ? renderCard(it) : h("div", { className: "ds-kanban__card-title" }, it.title ?? String(itemKey(it)))))
        )
      );
    })
  );
}
