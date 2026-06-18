import type {
  ButtonHTMLAttributes, HTMLAttributes, ReactNode,
  ForwardRefExoticComponent, RefAttributes,
} from "react";

export declare function ButtonGroup(
  props: HTMLAttributes<HTMLDivElement>
): JSX.Element;

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name (also used as the title tooltip). */
  label: string;
  variant?: "primary" | "danger";
  size?: "sm" | "lg";
}
export declare const IconButton: ForwardRefExoticComponent<
  IconButtonProps & RefAttributes<HTMLButtonElement>
>;

export interface SplitButtonProps {
  children?: ReactNode;
  onMain?: () => void;
  variant?: "primary" | "danger";
  size?: "sm" | "lg";
  /** Menu node rendered under the caret when open. */
  menu?: ReactNode;
  className?: string;
}
export declare function SplitButton(props: SplitButtonProps): JSX.Element;
