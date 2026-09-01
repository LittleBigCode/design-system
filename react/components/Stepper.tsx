import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface StepperStep {
  label: ReactNode;
  description?: ReactNode;
}

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  steps: StepperStep[];
  /** Index of the current step. */
  active?: number;
  /**
   * Which steps are complete. Defaults to every step before `active`.
   * Pass an array of indices or a predicate to override.
   */
  complete?: number[] | ((index: number) => boolean);
  /** Round the markers instead of the default square. */
  circle?: boolean;
}
const h = React.createElement;

/* ---- Stepper ------------------------------------------------------------
   steps: [{ label, description }] · active: index of the current step.
   By default every step before `active` is marked complete; pass an explicit
   `complete` (array of indices or a predicate) to override. `circle` switches
   the markers to round. */
export const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(function Stepper(
  { steps = [], active = 0, complete, circle, className, ...rest }, ref
) {
  const isComplete = (i: any) => {
    if (typeof complete === "function") return complete(i);
    if (Array.isArray(complete)) return complete.includes(i);
    return i < active;
  };

  return h("ol", {
    ref,
    className: cx("ds-stepper", circle && "ds-stepper--circle", className),
    ...rest,
  },
    steps.map((step, i) => {
      const done = isComplete(i);
      const current = i === active;
      return h("li", {
        key: i,
        className: cx("ds-stepper__step", current && "is-active", done && "is-complete"),
        "aria-current": current ? "step" : undefined,
      },
        h("span", { className: "ds-stepper__marker" }, i + 1),
        h("span", { className: "ds-stepper__label" }, step.label),
        step.description != null
          ? h("span", { className: "ds-stepper__desc" }, step.description)
          : null
      );
    })
  );
});
