import type { ReactNode } from "react";

export interface KanbanColumn {
  id: string;
  title: ReactNode;
}
export interface KanbanItem {
  id: string | number;
  column: string;
  [key: string]: any;
}
export interface KanbanProps<Item extends KanbanItem = KanbanItem> {
  columns: KanbanColumn[];
  items: Item[];
  itemKey?: (item: Item) => string | number;
  renderCard?: (item: Item) => ReactNode;
  /** Fired when a card is dropped into a column. */
  onMove?: (itemId: string | number, toColumnId: string) => void;
  className?: string;
}
export declare function Kanban<Item extends KanbanItem = KanbanItem>(
  props: KanbanProps<Item>
): JSX.Element;
