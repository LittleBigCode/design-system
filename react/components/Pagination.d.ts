import type { HTMLAttributes } from "react";

export interface PaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  /** Current 1-based page. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called with the next 1-based page when a control is activated. */
  onChange?: (page: number) => void;
  /** Pages shown on each side of the current page. Default 1. */
  siblingCount?: number;
}

export declare function Pagination(props: PaginationProps): JSX.Element;
