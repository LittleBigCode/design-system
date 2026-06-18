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

export declare function DataGrid<Row = any>(props: DataGridProps<Row>): JSX.Element;
