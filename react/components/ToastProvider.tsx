"use client"

import { cx } from "../lib/cx.js";
import React from "react";
import { createPortal } from "react-dom";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
  MouseEvent,
} from "react";

export type ToastType = "info" | "success" | "warning" | "danger";

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Status family. Defaults to "info". */
  type?: ToastType;
  title?: ReactNode;
  message?: ReactNode;
  /** Render a borderless × dismiss button wired to this handler. */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

/** Presentational toast card. */

export interface ToastOptions {
  title?: ReactNode;
  message?: ReactNode;
  type?: ToastType;
  /** Auto-dismiss delay in ms. 0 disables. Defaults to the provider's duration. */
  duration?: number;
}

export interface ToastApi {
  /** Show a toast; returns its id. */
  show: (opts?: ToastOptions) => number;
  /** Dismiss a toast by id. */
  dismiss: (id: number) => void;
}

/** Access the toast API. Must be called inside a <ToastProvider>. */

export interface ToastProviderProps {
  children?: ReactNode;
  /** Default auto-dismiss delay in ms for show(). Defaults to 4000. */
  duration?: number;
}
const h = React.createElement;

/* ---- Toast (presentational) ----------------------------------------------
   A single floating notification card. Status sets the left-bar color; an
   optional onClose renders the borderless × dismiss button. */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { type = "info", title, message, onClose, className, children, ...rest }, ref
) {
  return h("div", {
    ref,
    role: type === "danger" || type === "warning" ? "alert" : "status",
    className: cx("ds-toast", type && `ds-toast--${type}`, className),
    ...rest,
  },
    h("div", { className: "ds-toast__content" },
      title != null ? h("div", { className: "ds-toast__title" }, title) : null,
      message != null ? h("div", { className: "ds-toast__message" }, message) : null,
      children
    ),
    onClose
      ? h("button", {
          type: "button",
          className: "ds-toast__close",
          "aria-label": "Dismiss",
          onClick: onClose,
        }, "×")
      : null
  );
});

const ToastContext = React.createContext<ToastApi | null>(null);

/* ---- useToast ------------------------------------------------------------
   Returns { show(opts), dismiss(id) }. opts = { title, message, type, duration }.
   Auto-dismisses after `duration` ms (default 4000). */
export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
}

let toastSeq = 0;

/* ---- ToastProvider -------------------------------------------------------
   Renders a fixed top-right .ds-toasts viewport (via a portal to <body>) and
   provides the toast API through context. */
export function ToastProvider({ children, duration: defaultDuration = 4000 }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<any[]>([]);
  const timers = React.useRef(new Map());

  const dismiss = React.useCallback((id: any) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) { clearTimeout(timer); timers.current.delete(id); }
  }, []);

  const show = React.useCallback((opts: any = {}) => {
    const id = ++toastSeq;
    const duration = opts.duration != null ? opts.duration : defaultDuration;
    setToasts((list) => [...list, {
      id, title: opts.title, message: opts.message, type: opts.type || "info",
    }]);
    if (duration > 0) {
      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    }
    return id;
  }, [defaultDuration, dismiss]);

  React.useEffect(() => {
    const map = timers.current;
    return () => { map.forEach((t) => clearTimeout(t)); map.clear(); };
  }, []);

  const api = React.useMemo(() => ({ show, dismiss }), [show, dismiss]);

  const viewport = h("div", { className: "ds-toasts", role: "region", "aria-label": "Notifications" },
    toasts.map((t) => h(Toast, {
      key: t.id, type: t.type, title: t.title, message: t.message,
      onClose: () => dismiss(t.id),
    }))
  );

  return h(ToastContext.Provider, { value: api },
    children,
    typeof document !== "undefined" ? createPortal(viewport, document.body) : null
  );
}