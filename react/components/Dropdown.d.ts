import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";

interface MenuItemCommon {
  /** Destructive styling (red text, danger hover). */
  danger?: boolean;
}
export type MenuItemProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> &
      MenuItemCommon & { as?: "button" })
  | (AnchorHTMLAttributes<HTMLAnchorElement> &
      MenuItemCommon & { as: "a" });
export declare function MenuItem(props: MenuItemProps): JSX.Element;

export declare function MenuDivider(
  props: HTMLAttributes<HTMLDivElement>
): JSX.Element;

export declare function MenuHeader(
  props: HTMLAttributes<HTMLDivElement>
): JSX.Element;

export interface DropdownTriggerArgs {
  open: boolean;
  toggle: () => void;
  ref: Ref<HTMLElement>;
  props: {
    ref: Ref<HTMLElement>;
    onClick: () => void;
    "aria-haspopup": "menu";
    "aria-expanded": boolean;
  };
}

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The trigger: a render prop receiving open-state + props to spread, a single
   * element to clone props onto, or any node (wrapped in a default button).
   */
  trigger: ((args: DropdownTriggerArgs) => ReactElement) | ReactNode;
  /** Horizontal alignment of the menu against the trigger. Defaults to "start". */
  align?: "start" | "end";
  /** MenuItem / MenuDivider / MenuHeader children. */
  children?: ReactNode;
}
export declare function Dropdown(props: DropdownProps): JSX.Element;
