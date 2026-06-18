import React from "react";
import { createPortal } from "react-dom";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Toast (presentational) ----------------------------------------------
   A single floating notification card. Status sets the left-bar color; an
   optional onClose renders the borderless × dismiss button. */
export const Toast = React.forwardRef(function Toast(
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

const ToastContext = React.createContext(null);

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
export function ToastProvider({ children, duration: defaultDuration = 4000 }) {
  const [toasts, setToasts] = React.useState([]);
  const timers = React.useRef(new Map());

  const dismiss = React.useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) { clearTimeout(timer); timers.current.delete(id); }
  }, []);

  const show = React.useCallback((opts = {}) => {
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
