import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  /** Link target. Omitted (or on the last item) renders plain text. */
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Ordered trail; the last item is the current page. */
  items: BreadcrumbItem[];
}

export declare const Breadcrumb: ForwardRefExoticComponent<
  BreadcrumbProps & RefAttributes<HTMLElement>
>;
