import type { HTMLAttributes, ReactNode } from "react";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The rows to render. */
  items: AccordionItem[];
  /** Allow several panels open at once. Defaults to false (single-open). */
  multiple?: boolean;
  /** Uncontrolled initial open id(s). */
  defaultOpen?: string | string[];
  /** Controlled open id(s). */
  value?: string | string[];
  /**
   * Fires on toggle. With `multiple` it receives the array of open ids,
   * otherwise the single open id (or null when all are closed).
   */
  onChange?: (value: string | string[] | null) => void;
}
export declare function Accordion(props: AccordionProps): JSX.Element;
