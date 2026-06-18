import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
  MouseEvent,
} from "react";

export type AlertType = "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Status family. Defaults to "info". */
  type?: AlertType;
  /** Render a borderless × dismiss button. */
  dismissible?: boolean;
  /** Called when the alert is dismissed via the × button. */
  onDismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Optional leading icon node, placed in the icon slot. */
  icon?: ReactNode;
  /** App-level style: full width, solid status background, white text. */
  app?: boolean;
  children?: ReactNode;
}

export declare const Alert: ForwardRefExoticComponent<
  AlertProps & RefAttributes<HTMLDivElement>
>;
