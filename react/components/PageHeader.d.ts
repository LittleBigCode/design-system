import type { HTMLAttributes, ReactNode } from "react";

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** A <Breadcrumb> element rendered above the title. */
  breadcrumb?: ReactNode;
  /** Action elements (buttons) rendered on the right of the title row. */
  actions?: ReactNode;
  /** A tabs element rendered flush with the bottom rule. */
  tabs?: ReactNode;
  /** Remove the bottom padding of the title row (when tabs sit directly below). */
  flush?: boolean;
  className?: string;
}
export declare function PageHeader(props: PageHeaderProps): JSX.Element;
