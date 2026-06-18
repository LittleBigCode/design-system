import type {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverTriggerArgs {
  open: boolean;
  toggle: () => void;
  ref: Ref<HTMLElement>;
  props: {
    ref: Ref<HTMLElement>;
    onClick: () => void;
    "aria-haspopup": "dialog";
    "aria-expanded": boolean;
  };
}

export interface PopoverProps extends Omit<HTMLAttributes<HTMLSpanElement>, "title"> {
  /**
   * The trigger: a render prop receiving open-state + props to spread, a single
   * element to clone props onto, or any node (wrapped in a default button).
   */
  trigger: ((args: PopoverTriggerArgs) => ReactElement) | ReactNode;
  /** Where the popover sits relative to the trigger. Defaults to "bottom". */
  placement?: PopoverPlacement;
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. Defaults to false. */
  defaultOpen?: boolean;
  /** Fires whenever the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Optional uppercase title rendered above the body. */
  title?: ReactNode;
  /** Render the pointing arrow on the popover edge. Defaults to false. */
  arrow?: boolean;
  /** The popover body content. */
  children?: ReactNode;
}
export declare function Popover(props: PopoverProps): JSX.Element;
