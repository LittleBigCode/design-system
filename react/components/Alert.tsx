import { cx } from "../lib/cx.js";
import React from "react";

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
const h = React.createElement;

/* ---- Alert ---------------------------------------------------------------
   An inline (or app-level) status alert. Uncontrolled dismissal: when
   `dismissible`, the × button hides the alert from its own state and also
   fires `onDismiss`. Pass children for the body; `icon` is an optional node
   rendered in the leading icon slot. */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { type = "info", dismissible = false, onDismiss, icon, app = false, className, children, ...rest },
  ref
) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;

  const handleClose = (e: any) => {
    setDismissed(true);
    if (onDismiss) onDismiss(e);
  };

  return h("div", {
    ref,
    role: type === "danger" || type === "warning" ? "alert" : "status",
    className: cx("ds-alert", type && `ds-alert--${type}`, app && "ds-alert--app", className),
    ...rest,
  },
    icon != null ? h("span", { className: "ds-alert__icon", "aria-hidden": "true" }, icon) : null,
    h("div", { className: "ds-alert__content" }, children),
    dismissible
      ? h("button", {
          type: "button",
          className: "ds-alert__close",
          "aria-label": "Dismiss",
          onClick: handleClose,
        }, "×")
      : null
  );
});
