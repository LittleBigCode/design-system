"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type CellContext,
  type ColumnFiltersState,
  type ExpandedState,
  type Header,
  type OnChangeFn,
  type RowData,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table"

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { useControllableValue } from "../hooks/useControllableValue.js"
import { cx } from "../lib/cx.js"
import { Button } from "./button.js"
import { Checkbox } from "./checkbox.js"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu.js"
import { Editable } from "./editable.js"
import { Input } from "./input.js"
import { Spinner } from "./spinner.js"

declare module "@tanstack/react-table" {
  // Per-column opt-in for inline editing, mirroring v1's DataGridColumn flag.
  // Only read when the table itself is `editable`, so one prop still turns the
  // whole behaviour off.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    editable?: boolean
    /** Start hidden. v1's DataGridColumn carried the same flag. */
    hidden?: boolean
  }
}

/** A column's id, however it was declared. Mirrors TanStack's own resolution. */
function columnId<TData, TValue>(column: ColumnDef<TData, TValue>) {
  return (
    column.id ??
    ("accessorKey" in column ? String(column.accessorKey) : undefined) ??
    ""
  )
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table.js"
import {
  CaretUpIcon,
  CaretDownIcon,
  CaretUpDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ColumnsIcon,
  DotsSixVerticalIcon,
} from "@phosphor-icons/react"

function DataTableSortIcon({
  direction,
}: {
  direction: false | "asc" | "desc"
}) {
  if (direction === "asc") {
    return <CaretUpIcon className="ds-data-table-sort-icon" />
  }

  if (direction === "desc") {
    return <CaretDownIcon className="ds-data-table-sort-icon" />
  }

  return (
    <CaretUpDownIcon className="ds-data-table-sort-icon ds-data-table-sort-icon--unsorted" />
  )
}

function DataTableColumnHeader<TData, TValue>({
  header,
}: {
  header: Header<TData, TValue>
}) {
  const content = flexRender(
    header.column.columnDef.header,
    header.getContext()
  )

  if (!header.column.getCanSort()) {
    return content
  }

  return (
    <button
      type="button"
      data-slot="data-table-column-header"
      onClick={header.column.getToggleSortingHandler()}
      className="ds-data-table-column-header"
    >
      {content}
      <DataTableSortIcon direction={header.column.getIsSorted()} />
    </button>
  )
}

/**
 * The checkbox column, prepended when `selectable`. It is built here rather
 * than asked of the caller because a select-all whose state has to be right in
 * three ways — none, some, all — is exactly the thing every consumer would get
 * subtly wrong.
 */
function selectionColumn<TData, TValue>(
  label: (row: TData) => string
): ColumnDef<TData, TValue> {
  return {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        // Base UI takes `indeterminate` as its own prop rather than as a third
        // `checked` value, so the partial state is passed separately.
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(checked === true)
        }
        aria-label="Select all rows on this page"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(checked) => row.toggleSelected(checked === true)}
        aria-label={label(row.original)}
      />
    ),
  }
}

/**
 * The disclosure column, prepended when `expandable`. The trigger is a real
 * button carrying `aria-expanded` and a per-row name, so the detail is
 * reachable by keyboard and announced — a caret on a `td` click handler is
 * neither.
 */
function expanderColumn<TData, TValue>(
  label: (row: TData) => string
): ColumnDef<TData, TValue> {
  return {
    id: "expander",
    enableSorting: false,
    enableHiding: false,
    header: () => <span className="sr-only">Detail</span>,
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <Button
          variant="ghost"
          size="icon-xs"
          aria-expanded={row.getIsExpanded()}
          aria-label={label(row.original)}
          onClick={row.getToggleExpandedHandler()}
        >
          <CaretRightIcon className="ds-data-table-expander-icon" />
        </Button>
      ) : null,
  }
}

/**
 * A draggable `th`. `@dnd-kit` earns its place here rather than a hand-rolled
 * pointer handler because it ships a keyboard sensor: the grip is a real
 * button, so a column can be moved with the arrow keys and not only by drag —
 * which is the difference between this shipping and failing the a11y gate.
 */
function SortableHeadCell({
  id,
  children,
  colSpan,
}: {
  id: string
  children: React.ReactNode
  colSpan?: number
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id })

  return (
    <TableHead
      ref={setNodeRef}
      colSpan={colSpan}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.6 : undefined,
      }}
      className="ds-data-table-head--sortable"
    >
      <span className="ds-data-table-head-grip-wrap">
        <button
          type="button"
          data-slot="data-table-grip"
          className="ds-data-table-grip"
          aria-label={`Reorder ${id} column`}
          {...attributes}
          {...listeners}
        >
          <DotsSixVerticalIcon className="ds-data-table-grip-icon" />
        </button>
        {children}
      </span>
    </TableHead>
  )
}

function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  searchColumn,
  searchPlaceholder = "Filter results",
  emptyMessage = "No results.",
  className,
  selectable = false,
  rowKey,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  rowLabel,
  expandable = false,
  renderDetail,
  detailLabel,
  editable = false,
  onCellEdit,
  sort,
  defaultSort,
  onSortChange,
  columnToggle = false,
  reorderable = false,
  title,
  toolbar,
  loadPage,
  lazyMode = "pagination",
  loadMoreLabel = "Load more",
}: {
  columns: ColumnDef<TData, TValue>[]
  /** Ignored when `loadPage` is given — the rows come from the server then. */
  data?: TData[]
  pageSize?: number
  searchColumn?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  /** Prepend a checkbox column. */
  selectable?: boolean
  /** Stable identity per row. Without it, keys are row indices. */
  rowKey?: (row: TData) => string
  selectedKeys?: string[]
  defaultSelectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  /** Accessible name for a row's checkbox. Defaults to `Select row <key>`. */
  rowLabel?: (row: TData) => string
  /** Prepend a disclosure column. A function decides per row. */
  expandable?: boolean | ((row: TData) => boolean)
  /** The detail node, rendered in a full-width row under its parent. */
  renderDetail?: (row: TData) => React.ReactNode
  /** Accessible name for a row's disclosure. Defaults to `Show detail`. */
  detailLabel?: (row: TData) => string
  /** Turn on inline editing for columns whose `meta.editable` is set. */
  editable?: boolean
  onCellEdit?: (row: TData, columnKey: string, value: string) => void
  sort?: SortingState
  defaultSort?: SortingState
  onSortChange?: (sort: SortingState) => void
  /** Render the column-visibility menu in the header strip. */
  columnToggle?: boolean
  /** Let column headers be dragged — or arrow-keyed — into a new order. */
  reorderable?: boolean
  /** Header strip content. The column menu needs somewhere to live. */
  title?: React.ReactNode
  toolbar?: React.ReactNode
  /**
   * Fetch one page. Given this, sorting, filtering and paging all become the
   * server's job and are sent along on every call. `page` is 1-based.
   */
  loadPage?: (args: {
    page: number
    pageSize: number
    sort: SortingState
    filters: ColumnFiltersState
  }) => Promise<{ rows: TData[]; total: number }>
  /** Discrete pages, or append-on-demand. */
  lazyMode?: "pagination" | "infinite"
  loadMoreLabel?: React.ReactNode
}) {
  const [sorting, setSortingState] = useControllableValue<SortingState>({
    value: sort,
    defaultValue: defaultSort ?? [],
    onChange: onSortChange,
  })

  const setSorting: OnChangeFn<SortingState> = (updater) => {
    setSortingState(typeof updater === "function" ? updater(sorting) : updater)
  }
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  // Seeded from each column's `hidden` flag, which is v1's initial-state knob.
  const [columnVisibility, setColumnVisibility] = React.useState(() =>
    Object.fromEntries(
      columns
        .filter((column) => column.meta?.hidden)
        .map((column) => [columnId(column), false])
    )
  )
  const [columnOrder, setColumnOrder] = React.useState<string[]>([])

  const lazy = Boolean(loadPage)
  const loadPageRef = React.useRef(loadPage)
  loadPageRef.current = loadPage

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: pageSize ?? 10,
  })
  const [lazyRows, setLazyRows] = React.useState<TData[]>([])
  const [total, setTotal] = React.useState(0)
  const [loading, setLoading] = React.useState(false)

  // Anything that invalidates the whole result set, as one comparable value.
  // Sorting and filtering are the server's job now, so changing either means
  // the rows already fetched are answers to a different question.
  const requestKey = JSON.stringify([
    sorting,
    columnFilters,
    pagination.pageSize,
  ])
  const lastRequestKey = React.useRef(requestKey)
  if (lazy && lastRequestKey.current !== requestKey) {
    lastRequestKey.current = requestKey
    if (pagination.pageIndex !== 0) {
      setPagination((current) => ({ ...current, pageIndex: 0 }))
    }
    setLazyRows([])
  }

  React.useEffect(() => {
    if (!lazy) return
    let cancelled = false
    setLoading(true)
    Promise.resolve(
      loadPageRef.current!({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sort: sorting,
        filters: columnFilters,
      })
    )
      .then((result) => {
        if (cancelled) return
        setLazyRows((previous) =>
          // Only infinite mode past the first page keeps what it already has.
          lazyMode === "infinite" && pagination.pageIndex > 0
            ? [...previous, ...result.rows]
            : result.rows
        )
        setTotal(result.total)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // `requestKey` stands in for sorting/filters/pageSize by value, so a new
    // array identity with the same contents does not refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazy, lazyMode, pagination.pageIndex, requestKey])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const [keys, setKeys] = useControllableValue<string[]>({
    value: selectedKeys,
    defaultValue: defaultSelectedKeys ?? [],
    onChange: onSelectionChange,
  })

  // TanStack holds selection as a truthy map; the prop is a key list, which is
  // what a caller actually wants to store and compare.
  const rowSelection = React.useMemo<RowSelectionState>(
    () => Object.fromEntries(keys.map((key) => [key, true])),
    [keys]
  )

  const onRowSelectionChange: OnChangeFn<RowSelectionState> = (updater) => {
    const next = typeof updater === "function" ? updater(rowSelection) : updater
    setKeys(Object.keys(next).filter((key) => next[key]))
  }

  // `rowKey` and `rowLabel` are usually written inline at the call site, so a
  // new identity arrives on every render. Reading them through a ref keeps the
  // column list and `getRowId` stable — rebuilding either on each render makes
  // TanStack re-create its column instances, and the select-all header then
  // renders against a stale table and jams.
  const rowKeyRef = React.useRef(rowKey)
  const rowLabelRef = React.useRef(rowLabel)
  const detailLabelRef = React.useRef(detailLabel)
  const expandableRef = React.useRef(expandable)
  rowKeyRef.current = rowKey
  rowLabelRef.current = rowLabel
  detailLabelRef.current = detailLabel
  expandableRef.current = expandable

  const onCellEditRef = React.useRef(onCellEdit)
  onCellEditRef.current = onCellEdit

  const canExpand = Boolean(expandable) && Boolean(renderDetail)

  // An editable column keeps its accessor — so sorting and filtering still read
  // the value — and only its `cell` is swapped for the existing `Editable`,
  // rather than a second inline-edit implementation living here. Editable's own
  // pencil is a focusable button, which is the keyboard path v1's double-click
  // never had.
  const editableColumns = React.useMemo(
    () =>
      editable
        ? columns.map((column) =>
            column.meta?.editable
              ? {
                  ...column,
                  cell: (context: CellContext<TData, unknown>) => (
                    <Editable
                      value={String(context.getValue() ?? "")}
                      onSubmit={(next) =>
                        onCellEditRef.current?.(
                          context.row.original,
                          context.column.id,
                          next
                        )
                      }
                    />
                  ),
                }
              : column
          )
        : columns,
    [editable, columns]
  )

  const resolvedColumns = React.useMemo(
    () => [
      ...(canExpand
        ? [
            expanderColumn<TData, TValue>(
              (row) => detailLabelRef.current?.(row) ?? "Show detail"
            ),
          ]
        : []),
      ...(selectable
        ? [
            selectionColumn<TData, TValue>(
              (row) =>
                rowLabelRef.current?.(row) ??
                `Select row ${rowKeyRef.current ? rowKeyRef.current(row) : ""}`
            ),
          ]
        : []),
      ...editableColumns,
    ],
    [selectable, canExpand, editableColumns]
  )

  const getRowId = React.useMemo(
    () => (rowKey ? (row: TData) => rowKeyRef.current!(row) : undefined),
    // Only whether a key function exists matters; its identity is behind a ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Boolean(rowKey)]
  )

  const table = useReactTable({
    data: lazy ? lazyRows : (data ?? []),
    columns: resolvedColumns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      expanded,
      columnVisibility,
      ...(reorderable && columnOrder.length ? { columnOrder } : {}),
      ...(lazy || pageSize ? { pagination } : {}),
    },
    getRowId,
    enableRowSelection: selectable,
    onRowSelectionChange,
    onExpandedChange: setExpanded,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    // Expansion here is a detail panel, not a row tree, so "can expand" is the
    // caller's predicate rather than a child-row count.
    getRowCanExpand: canExpand
      ? (row) => {
          const rule = expandableRef.current
          return typeof rule === "function" ? rule(row.original) : true
        }
      : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: canExpand ? getExpandedRowModel() : undefined,
    // The server already sliced, sorted and filtered, so the client row models
    // must not do it again — that would page a page.
    manualPagination: lazy,
    manualSorting: lazy,
    manualFiltering: lazy,
    rowCount: lazy ? total : undefined,
    onPaginationChange: setPagination,
    getPaginationRowModel:
      pageSize && !lazy ? getPaginationRowModel() : undefined,
  })

  const filterColumn = searchColumn ? table.getColumn(searchColumn) : undefined

  // Only the reorderable columns take part: the checkbox and disclosure columns
  // are structural, so dragging one behind the data would be nonsense.
  const orderedIds = table
    .getAllLeafColumns()
    .filter((column) => column.getCanHide())
    .map((column) => column.id)

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    const current = columnOrder.length
      ? columnOrder
      : table.getAllLeafColumns().map((column) => column.id)
    const from = current.indexOf(String(active.id))
    const to = current.indexOf(String(over.id))
    if (from < 0 || to < 0) return
    setColumnOrder(arrayMove(current, from, to))
  }

  return (
    <div data-slot="data-table" className={cx("ds-data-table", className)}>
      {(title || toolbar || columnToggle || filterColumn) && (
        <div data-slot="data-table-header" className="ds-data-table-header">
          <div className="ds-data-table-header-start">
            {title ? (
              <div className="ds-data-table-title">{title}</div>
            ) : null}
            {filterColumn && (
              <Input
                data-slot="data-table-search"
                value={(filterColumn.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  filterColumn.setFilterValue(event.target.value)
                }
                placeholder={searchPlaceholder}
                className="ds-data-table-search"
              />
            )}
          </div>
          <div className="ds-data-table-header-end">
            {toolbar}
            {columnToggle && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="outline" size="sm" />}
                >
                  <ColumnsIcon data-icon="inline-start" />
                  Columns
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* Base UI requires checkbox items to sit inside a group —
                      without one the menu throws on open. */}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
                    {table
                      .getAllLeafColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          checked={column.getIsVisible()}
                          onCheckedChange={(checked) =>
                            column.toggleVisibility(checked === true)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <div className="ds-data-table-body-wrap">
          <SortableContext
            items={orderedIds}
            strategy={horizontalListSortingStrategy}
          >
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) =>
                      reorderable && header.column.getCanHide() ? (
                        <SortableHeadCell
                          key={header.id}
                          id={header.column.id}
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder ? null : (
                            <DataTableColumnHeader header={header} />
                          )}
                        </SortableHeadCell>
                      ) : (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <DataTableColumnHeader header={header} />
                          )}
                        </TableHead>
                      )
                    )}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow
                        data-state={
                          row.getIsSelected() ? "selected" : undefined
                        }
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      {canExpand && row.getIsExpanded() ? (
                        <TableRow data-slot="data-table-detail">
                          <TableCell
                            colSpan={row.getVisibleCells().length}
                            className="ds-data-table-detail-cell"
                          >
                            {renderDetail?.(row.original)}
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={resolvedColumns.length}
                      className="ds-data-table-empty-cell"
                    >
                      {emptyMessage}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </SortableContext>
        </div>
      </DndContext>

      {lazy && lazyMode === "infinite" ? (
        <div data-slot="data-table-more" className="ds-data-table-more">
          <span className="ds-data-table-pagination-info">
            {lazyRows.length} of {total}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={loading || lazyRows.length >= total}
            onClick={() =>
              setPagination((current) => ({
                ...current,
                pageIndex: current.pageIndex + 1,
              }))
            }
          >
            {loading ? <Spinner label="Loading more rows" /> : null}
            {loadMoreLabel}
          </Button>
        </div>
      ) : null}

      {(pageSize || lazy) && lazyMode !== "infinite" && (
        <div
          data-slot="data-table-pagination"
          className="ds-data-table-pagination"
        >
          <span className="ds-data-table-pagination-info">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </span>
          <div className="ds-data-table-pagination-controls">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              <CaretLeftIcon className="ds-data-table-pagination-icon" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              <CaretRightIcon className="ds-data-table-pagination-icon" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { DataTable, DataTableColumnHeader }
export type { ColumnDef }
