import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface DescriptionListItem {
  /** The term (rendered as an uppercase label in a <dt>). */
  term: ReactNode;
  /** The description / value (rendered in a <dd>). */
  desc: ReactNode;
}
export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionListItem[];
}
export declare const DescriptionList: ForwardRefExoticComponent<
  DescriptionListProps & RefAttributes<HTMLDListElement>
>;
