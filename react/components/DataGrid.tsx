"use client"

import { cx } from "../lib/cx.js";
/* DataGrid — sortable, filterable, selectable, expandable, paginated, and
   LAZY-LOADABLE data grid. Two data modes:
     • client mode  — pass `rows`; sorting/filtering/paging happen in-memory.
     • lazy/server  — pass `loadPage(async ({page,pageSize,sort,filters}) => {rows,total})`;
                      the grid calls it on mount and whenever page/sort/filters change.
   Lazy supports `lazyMode="pagination"` (page controls) or `"infinite"` (Load more).
   Reuses .ds-skeleton for loading placeholder rows. */
import React from "react";

import type { ReactNode } from "react";

export interface DataGridColumn<Row = any> {
  key: string;
  header: ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  align?: "left" | "right";
  width?: string | number;
  hidden?: boolean;
  /** Allow inline editing of this column's cells (requires grid `editable`). */
  editable?: boolean;
  render?: (row: Row) => ReactNode;
}

export interface DataGridSort { key: string; dir: "asc" | "desc"; }

export interface LoadPageArgs {
  page: number;
  pageSize: number;
  sort: DataGridSort | null;
  filters: Record<string, string>;
}
export interface LoadPageResult<Row = any> { rows: Row[]; total: number; }

export interface DataGridProps<Row = any> {
  columns: DataGridColumn<Row>[];
  /** Client data. Omit when using `loadPage` (lazy/server mode). */
  rows?: Row[];
  rowKey?: (row: Row, index: number) => string | number;
  selectable?: boolean;
  selectedKeys?: Array<string | number>;
  defaultSelectedKeys?: Array<string | number>;
  onSelectionChange?: (keys: Array<string | number>) => void;
  /** true with `renderDetail`, or a function returning the detail node. */
  expandable?: boolean | ((row: Row) => ReactNode);
  renderDetail?: (row: Row) => ReactNode;
  defaultSort?: DataGridSort | null;
  onSortChange?: (sort: DataGridSort | null) => void;
  filterable?: boolean;
  pageSize?: number;
  /** Lazy/server mode: called on mount and whenever page/sort/filters change. */
  loadPage?: (args: LoadPageArgs) => Promise<LoadPageResult<Row>> | LoadPageResult<Row>;
  lazyMode?: "pagination" | "infinite";
  title?: ReactNode;
  toolbar?: ReactNode;
  columnToggle?: boolean;
  /** Enable inline cell editing (double-click) for columns marked `editable`. */
  editable?: boolean;
  onCellEdit?: (row: Row, columnKey: string, value: string) => void;
  /** Allow reordering columns by dragging their headers. */
  reorderable?: boolean;
  emptyMessage?: ReactNode;
  className?: string;
}
const h = React.createElement;

const getVal = (row: any, key: any) =>
  String(key).split(".").reduce((o, k) => (o == null ? o : o[k]), row);
const defaultRowKey = (r: any, i: any) => (r && r.id != null ? r.id : i);

export function DataGrid<Row = any>({
  columns = [],
  rows,
  rowKey = defaultRowKey,
  selectable = false,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  expandable = false,
  renderDetail,
  defaultSort = null,
  onSortChange,
  filterable = false,
  pageSize = 10,
  loadPage,
  lazyMode = "pagination",
  title,
  toolbar,
  columnToggle = true,
  editable = false,
  onCellEdit,
  reorderable = false,
  emptyMessage = "No data",
  className,
}: DataGridProps<Row>) {
  const lazy = typeof loadPage === "function";
  const [sort, setSort] = React.useState(defaultSort);
  const [filters, setFilters] = React.useState<any>({});
  const [page, setPage] = React.useState(1);
  const [internalSel, setInternalSel] = React.useState(() => new Set(defaultSelectedKeys || []));
  const sel = selectedKeys ? new Set(selectedKeys) : internalSel;
  const [expanded, setExpanded] = React.useState(() => new Set());
  const [hidden, setHidden] = React.useState(() => new Set(columns.filter((c) => c.hidden).map((c) => c.key)));
  const [colsOpen, setColsOpen] = React.useState(false);
  const [colOrder, setColOrder] = React.useState(() => columns.map((c) => c.key));
  const [dragCol, setDragCol] = React.useState<any>(null);
  const [editing, setEditing] = React.useState<any>(null); // { rowKey, colKey }

  // Lazy data state
  const [lazyRows, setLazyRows] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const loadRef = React.useRef(loadPage);
  loadRef.current = loadPage;

  React.useEffect(() => {
    const load = loadRef.current;
    if (!lazy || !load) return undefined;
    let cancelled = false;
    setLoading(true);
    Promise.resolve(load({ page, pageSize, sort, filters }))
      .then((res) => {
        if (cancelled) return;
        setTotal(res.total ?? 0);
        setLazyRows((prev) =>
          lazyMode === "infinite" && page > 1 ? prev.concat(res.rows || []) : (res.rows || [])
        );
        setLoading(false);
      })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [lazy, page, pageSize, sort, filters, lazyMode]);

  // Columns in their (possibly reordered) order; newly-added columns append.
  const orderedColumns = colOrder
    .map((k) => columns.find((c) => c.key === k))
    .filter((c): c is DataGridColumn<Row> => Boolean(c))
    .concat(columns.filter((c) => !colOrder.includes(c.key)));
  const visibleCols = orderedColumns.filter((c) => !hidden.has(c.key));

  // Client-side processing
  const processed = React.useMemo(() => {
    if (lazy) return null;
    let data = (rows || []).slice();
    if (filterable) {
      for (const [k, v] of Object.entries(filters)) {
        if (v) data = data.filter((r: any) => String(getVal(r, k) ?? "").toLowerCase().includes(String(v).toLowerCase()));
      }
    }
    if (sort && sort.key) {
      data.sort((a: any, b: any) => {
        const av = getVal(a, sort.key), bv = getVal(b, sort.key);
        const cmp = av > bv ? 1 : av < bv ? -1 : 0;
        return sort.dir === "desc" ? -cmp : cmp;
      });
    }
    return data;
  }, [lazy, rows, filters, sort, filterable]);

  const totalCount = lazy ? total : (processed ? processed.length : 0);
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));

  let pageRows;
  if (lazy) pageRows = lazyRows;
  else if (lazyMode === "infinite") pageRows = (processed ?? []).slice(0, page * pageSize);
  else pageRows = (processed ?? []).slice((page - 1) * pageSize, page * pageSize);

  const hasMore = lazyMode === "infinite" && pageRows.length < totalCount;

  // Handlers
  const resetPage = () => setPage(1);
  const toggleSort = (key: any) => {
    const next: DataGridSort | null = !sort || sort.key !== key ? { key, dir: "asc" }
      : sort.dir === "asc" ? { key, dir: "desc" } : null;
    setSort(next); resetPage(); onSortChange && onSortChange(next);
  };
  const setFilter = (key: any, value: any) => { setFilters((f: any) => ({ ...f, [key]: value })); resetPage(); };
  const commitSel = (next: any) => {
    if (!selectedKeys) setInternalSel(next);
    onSelectionChange && onSelectionChange(Array.from(next));
  };
  const toggleRow = (k: any) => { const n = new Set(sel); n.has(k) ? n.delete(k) : n.add(k); commitSel(n); };
  const pageKeys = pageRows.map((r: any, i: any) => rowKey(r, i));
  const allOnPage = pageKeys.length > 0 && pageKeys.every((k: any) => sel.has(k));
  const toggleAll = () => {
    const n = new Set(sel);
    if (allOnPage) pageKeys.forEach((k: any) => n.delete(k));
    else pageKeys.forEach((k: any) => n.add(k));
    commitSel(n);
  };
  const toggleExpand = (k: any) => setExpanded((e) => { const n = new Set(e); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const toggleCol = (key: any) => setHidden((hd) => { const n = new Set(hd); n.has(key) ? n.delete(key) : n.add(key); return n; });
  const moveColumn = (from: any, to: any) => {
    if (from === to) return;
    setColOrder((order) => {
      const arr = order.slice();
      const fi = arr.indexOf(from), ti = arr.indexOf(to);
      if (fi < 0 || ti < 0) return order;
      arr.splice(ti, 0, arr.splice(fi, 1)[0]);
      return arr;
    });
  };
  const commitEdit = (row: any, colKey: any, value: any) => { setEditing(null); onCellEdit && onCellEdit(row, colKey, value); };

  const colSpan = visibleCols.length + (selectable ? 1 : 0) + (expandable ? 1 : 0);
  const anyFilter = filterable && visibleCols.some((c) => c.filterable);

  /* ---- Grid keyboard model --------------------------------------------
     The table is a real <table>, so role="grid" upgrades it from something a
     reader walks linearly to something they can steer a cell at a time. That
     needs exactly one tab stop, which is applied imperatively over
     HTMLTableElement.rows rather than threaded through the renderers: the row
     index of any given cell depends on whether the filter row, the skeleton
     rows and each expanded detail row are present, and reproducing that
     arithmetic in JSX is how it drifts. The effect has no dependency array
     because a fresh render produces fresh cells with no tabIndex on them. */
  const tableRef = React.useRef<HTMLTableElement | null>(null);
  const [active, setActive] = React.useState({ r: 0, c: 0 });

  React.useLayoutEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    for (const row of Array.from(table.rows)) {
      for (const cell of Array.from(row.cells)) cell.tabIndex = -1;
    }
    const row = table.rows[Math.min(active.r, table.rows.length - 1)];
    const cell = row && row.cells[Math.min(active.c, row.cells.length - 1)];
    if (cell) cell.tabIndex = 0;
  });

  const focusCell = (r: number, c: number) => {
    const table = tableRef.current;
    if (!table || !table.rows.length) return;
    const row = table.rows[Math.max(0, Math.min(r, table.rows.length - 1))];
    if (!row || !row.cells.length) return;
    const cell = row.cells[Math.max(0, Math.min(c, row.cells.length - 1))];
    if (!cell) return;
    setActive({ r: row.rowIndex, c: cell.cellIndex });
    cell.focus();
  };

  const onCellKeyDown = (e: any) => {
    /* Anything focusable inside the cell — the inline edit input, the row and
       select-all checkboxes, the sort and expand buttons, the filter inputs —
       owns its own keys. Without this guard the arrows would fight the edit
       input's caret and Enter would never reach its commit handler. */
    if (e.target !== e.currentTarget) return;
    const cell = e.currentTarget as HTMLTableCellElement;
    const r = (cell.parentElement as HTMLTableRowElement).rowIndex;
    const c = cell.cellIndex;
    switch (e.key) {
      case "ArrowRight": focusCell(r, c + 1); break;
      case "ArrowLeft": focusCell(r, c - 1); break;
      case "ArrowDown": focusCell(r + 1, c); break;
      case "ArrowUp": focusCell(r - 1, c); break;
      case "Home": focusCell(e.ctrlKey ? 0 : r, 0); break;
      case "End": focusCell(e.ctrlKey ? Number.MAX_SAFE_INTEGER : r, Number.MAX_SAFE_INTEGER); break;
      /* Enter delegates to whatever the cell holds, so one key does the right
         thing on a checkbox cell, a sort header and an editable cell alike. */
      case "Enter": {
        const control = cell.querySelector("button, input, a, select") as HTMLElement | null;
        if (control) control.click();
        else return;
        break;
      }
      default: return;
    }
    e.preventDefault();
  };

  const cellNav = { onKeyDown: onCellKeyDown };

  // Renderers
  const renderHeader = () =>
    h("tr", { role: "row" },
      expandable ? h("th", { className: "ds-datagrid__expandcell", key: "_x", role: "columnheader", ...cellNav }) : null,
      selectable ? h("th", { className: "ds-datagrid__select", key: "_s", role: "columnheader", ...cellNav },
        h("input", { type: "checkbox", "aria-label": "Select all", checked: allOnPage, onChange: toggleAll })) : null,
      visibleCols.map((c) => {
        const sorted = sort && sort.key === c.key;
        return h("th", {
          key: c.key,
          role: "columnheader",
          "aria-sort": sorted ? (sort.dir === "asc" ? "ascending" : "descending") : undefined,
          ...cellNav,
          className: cx("ds-datagrid__th", c.align === "right" && "ds-datagrid__th--num", sorted && "is-sorted",
            reorderable && "ds-datagrid__th--draggable", dragCol === c.key && "is-dragging"),
          style: c.width ? { width: c.width } : undefined,
          draggable: reorderable || undefined,
          onDragStart: reorderable ? () => setDragCol(c.key) : undefined,
          onDragOver: reorderable ? (e: any) => e.preventDefault() : undefined,
          onDrop: reorderable ? (e: any) => { e.preventDefault(); if (dragCol) moveColumn(dragCol, c.key); setDragCol(null); } : undefined,
          onDragEnd: reorderable ? () => setDragCol(null) : undefined,
        },
          c.sortable
            ? h("button", { type: "button", className: "ds-datagrid__sort", onClick: () => toggleSort(c.key) },
                c.header,
                h("span", { className: "ds-datagrid__sort-ind" }, sorted ? (sort.dir === "asc" ? "▲" : "▼") : "↕"))
            : c.header
        );
      })
    );

  const renderFilters = () => !anyFilter ? null :
    h("tr", { className: "ds-datagrid__filters", role: "row" },
      expandable ? h("th", { key: "_x", role: "columnheader", ...cellNav }) : null,
      selectable ? h("th", { key: "_s", role: "columnheader", ...cellNav }) : null,
      visibleCols.map((c) => h("th", { key: c.key, role: "columnheader", ...cellNav },
        c.filterable ? h("input", {
          className: "ds-datagrid__filter-input", type: "text", placeholder: "Filter…",
          value: filters[c.key] || "", "aria-label": `Filter ${c.header}`,
          onChange: (e: any) => setFilter(c.key, e.target.value),
        }) : null))
    );

  const renderSkeleton = () => Array.from({ length: Math.min(pageSize, 6) }).map((_, i) =>
    h("tr", { key: `skel${i}`, className: "ds-datagrid__row", role: "row" },
      expandable ? h("td", { className: "ds-datagrid__expandcell", role: "gridcell", ...cellNav }) : null,
      selectable ? h("td", { className: "ds-datagrid__select", role: "gridcell", ...cellNav }) : null,
      visibleCols.map((c) => h("td", { key: c.key, role: "gridcell", ...cellNav }, h("span", { className: "ds-skeleton ds-skeleton--text", style: { width: "70%" } })))
    ));

  const renderRows = () => pageRows.map((row: any, i: any) => {
    const k = rowKey(row, i);
    const isSel = sel.has(k);
    const isExp = expanded.has(k);
    const detail = expandable ? (renderDetail ? renderDetail(row) : (typeof expandable === "function" ? expandable(row) : null)) : null;
    const main = h("tr", { key: k, role: "row", "aria-selected": selectable ? isSel : undefined, className: cx("ds-datagrid__row", isSel && "is-selected", isExp && "is-expanded") },
      expandable ? h("td", { className: "ds-datagrid__expandcell", role: "gridcell", ...cellNav },
        detail != null ? h("button", { type: "button", className: "ds-datagrid__expand", "aria-expanded": isExp, "aria-label": "Toggle row", onClick: () => toggleExpand(k) },
          h("span", { className: "ds-datagrid__chevron" }, "▶")) : null) : null,
      selectable ? h("td", { className: "ds-datagrid__select", role: "gridcell", ...cellNav },
        h("input", { type: "checkbox", "aria-label": "Select row", checked: isSel, onChange: () => toggleRow(k) })) : null,
      visibleCols.map((c) => {
        const editingThis = editing && editing.rowKey === k && editing.colKey === c.key;
        if (editingThis) {
          return h("td", { key: c.key, role: "gridcell", className: c.align === "right" ? "ds-datagrid__td--num" : undefined },
            h("input", {
              className: "ds-input ds-datagrid__edit", autoFocus: true,
              defaultValue: getVal(row, c.key),
              onKeyDown: (e: any) => {
                if (e.key === "Enter") commitEdit(row, c.key, e.target.value);
                else if (e.key === "Escape") setEditing(null);
              },
              onBlur: (e: any) => commitEdit(row, c.key, e.target.value),
            }));
        }
        const cellEditable = editable && c.editable;
        return h("td", {
          key: c.key,
          role: "gridcell",
          className: cx(c.align === "right" && "ds-datagrid__td--num", cellEditable && "ds-datagrid__td--editable"),
          onDoubleClick: cellEditable ? () => setEditing({ rowKey: k, colKey: c.key }) : undefined,
          /* Enter opens the editor the same way the double-click does, so the
             cell is reachable without a pointer. The editor's own Enter/Escape
             handler takes over once its input has focus. */
          onKeyDown: cellEditable
            ? (e: any) => {
                if (e.target === e.currentTarget && e.key === "Enter") {
                  e.preventDefault();
                  setEditing({ rowKey: k, colKey: c.key });
                  return;
                }
                onCellKeyDown(e);
              }
            : onCellKeyDown,
          title: cellEditable ? "Double-click or press Enter to edit" : undefined,
        }, c.render ? c.render(row) : getVal(row, c.key));
      })
    );
    if (isExp && detail != null) {
      return [main, h("tr", { key: `${k}__d`, className: "ds-datagrid__detail", role: "row" }, h("td", { colSpan, role: "gridcell", ...cellNav }, detail))];
    }
    return main;
  });

  const showSkeleton = lazy && loading && pageRows.length === 0;
  const showEmpty = !loading && pageRows.length === 0;

  return h("div", { className: cx("ds-datagrid", className) },
    (title || toolbar || (columnToggle && columns.length)) ?
      h("div", { className: "ds-datagrid__toolbar" },
        title ? h("div", { className: "ds-datagrid__title" }, title) : null,
        h("div", { className: "ds-datagrid__spacer" }),
        toolbar,
        columnToggle ? h("div", { className: "ds-datagrid__cols" },
          h("button", { type: "button", className: "ds-button ds-button--sm", "aria-expanded": colsOpen, onClick: () => setColsOpen((o) => !o) }, "Columns"),
          colsOpen ? h("div", { className: "ds-datagrid__cols-menu" },
            columns.map((c) => h("label", { key: c.key, className: "ds-datagrid__cols-item" },
              h("input", { type: "checkbox", checked: !hidden.has(c.key), onChange: () => toggleCol(c.key) }),
              c.header))) : null) : null
      ) : null,

    h("div", { className: "ds-datagrid__scroll" },
      h("table", { className: "ds-datagrid__table", role: "grid", ref: tableRef },
        h("thead", null, renderHeader(), renderFilters()),
        h("tbody", null,
          showSkeleton ? renderSkeleton()
            : showEmpty ? h("tr", { role: "row" }, h("td", { className: "ds-datagrid__empty", colSpan, role: "gridcell", ...cellNav }, emptyMessage))
            : renderRows()
        )
      )
    ),

    // Footer: infinite -> Load more; otherwise page controls
    lazyMode === "infinite"
      ? h("div", { className: "ds-datagrid__footer" },
          h("span", { className: "ds-datagrid__count" }, `${pageRows.length} of ${totalCount}`),
          h("div", { className: "ds-datagrid__pager" },
            hasMore ? h("button", {
              type: "button", className: "ds-button ds-button--sm", disabled: loading,
              onClick: () => setPage((p) => p + 1),
            }, loading ? "Loading…" : "Load more") : null))
      : h("div", { className: "ds-datagrid__footer" },
          h("span", { className: "ds-datagrid__count" },
            totalCount === 0 ? "0 rows" : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, totalCount)} of ${totalCount}`),
          h("div", { className: "ds-datagrid__pager" },
            h("button", { type: "button", className: "ds-datagrid__pagebtn", disabled: page <= 1, onClick: () => setPage(1), "aria-label": "First" }, "«"),
            h("button", { type: "button", className: "ds-datagrid__pagebtn", disabled: page <= 1, onClick: () => setPage((p) => Math.max(1, p - 1)), "aria-label": "Previous" }, "‹"),
            h("span", { style: { padding: "0 8px" } }, `Page ${page} / ${pageCount}`),
            h("button", { type: "button", className: "ds-datagrid__pagebtn", disabled: page >= pageCount, onClick: () => setPage((p) => Math.min(pageCount, p + 1)), "aria-label": "Next" }, "›"),
            h("button", { type: "button", className: "ds-datagrid__pagebtn", disabled: page >= pageCount, onClick: () => setPage(pageCount), "aria-label": "Last" }, "»")
          ))
  );
}