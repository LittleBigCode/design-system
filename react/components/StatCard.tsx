import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Uppercase faint label above the figure. */
  label?: ReactNode;
  /** The headline figure. */
  value?: ReactNode;
  /** Signed change shown under the value. */
  delta?: ReactNode;
  /** Colors the delta (success/danger) and prepends a ▲/▼. */
  deltaDir?: "up" | "down";
  /** Count the numeric part of `value` up on mount (respects reduced-motion). */
  animate?: boolean;
  /** Rendered in a spark slot under the value (e.g. a Sparkline). */
  children?: ReactNode;
}
const h = React.createElement;
const { useState, useEffect } = React;

// Split a value like "€4.51M", "24.6 %", "+12" into prefix / number / suffix.
function parseValue(v: any) {
  const m = String(v).match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], num: parseFloat(m[2]), decimals: (m[2].split(".")[1] || "").length, suffix: m[3] };
}

// Count up to a numeric value on mount; no-op (returns the value) when disabled,
// non-numeric, or the user prefers reduced motion.
function useCountUp(value: any, on: any) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const p = on && !reduce ? parseValue(value) : null;
    if (!p) { setShown(value); return undefined; }
    const fmt = (x: any) => p.prefix + x.toFixed(p.decimals) + p.suffix;
    let raf: number | undefined;
    let start: number | null = null;
    const dur = 700;
    setShown(fmt(0));
    const tick = (t: any) => {
      if (start === null) start = t;
      const k = Math.min(1, (t - (start as number)) / dur);
      setShown(fmt(p.num * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { if (raf !== undefined) cancelAnimationFrame(raf); };
  }, [value, on]);
  return shown;
}

/* ---- StatCard ------------------------------------------------------------
   A dashboard KPI tile: an uppercase faint `label`, a large title-voiced
   `value`, an optional `delta` whose `deltaDir` ("up" | "down") colors it and
   prepends a ▲/▼, and `children` rendered in a spark slot under the value
   (e.g. a <Sparkline>). Set `animate` to count the value up on mount.
   forwardRef lands on the root <div>. */
export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, delta, deltaDir, animate, className, children, ...rest }, ref
) {
  const dirClass = deltaDir === "up" ? "is-up" : deltaDir === "down" ? "is-down" : null;
  const shown = useCountUp(value, !!animate);
  return h("div", {
    ref,
    className: cx("ds-stat", className),
    ...rest,
  },
    label != null ? h("div", { className: "ds-stat__label" }, label) : null,
    value != null ? h("div", { className: "ds-stat__value" }, animate ? shown : value) : null,
    delta != null
      ? h("div", { className: cx("ds-stat__delta", dirClass) }, delta)
      : null,
    children != null ? h("div", { className: "ds-stat__spark" }, children) : null
  );
});
