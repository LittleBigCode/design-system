import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Wizard -------------------------------------------------------------
   A multi-step flow built on the stepper. Renders the stepper trail (steps
   before `active` are marked complete, `active` is current), the active step's
   `content` in a panel, and a footer with Back / Next / Finish.

   steps: [{ label, content, disableNext? }]
   - Back is disabled on the first step.
   - Next advances; it is disabled when the active step sets `disableNext`.
   - On the last step Next becomes Finish and calls `onFinish` instead.

   Works controlled (`active` + `onStepChange`) or uncontrolled (`defaultActive`).
   `onStepChange(index)` fires whenever Back/Next move between steps. */
export const Wizard = React.forwardRef(function Wizard(
  { steps = [], active, defaultActive = 0, onStepChange, onFinish, className, ...rest }, ref
) {
  const controlled = active !== undefined;
  const [internal, setInternal] = React.useState(defaultActive);
  const current = controlled ? active : internal;

  const count = steps.length;
  const isFirst = current <= 0;
  const isLast = current >= count - 1;
  const step = steps[current] || {};
  const nextDisabled = Boolean(step.disableNext);

  const goTo = (i) => {
    const next = Math.max(0, Math.min(count - 1, i));
    if (next === current) return;
    if (!controlled) setInternal(next);
    if (onStepChange) onStepChange(next);
  };

  const onNext = () => {
    if (isLast) { if (onFinish) onFinish(); return; }
    goTo(current + 1);
  };

  return h("div", {
    ref,
    className: cx("ds-wizard", className),
    ...rest,
  },
    /* Stepper header — same markup the Stepper component renders. */
    h("div", { className: "ds-wizard__steps" },
      h("ol", { className: "ds-stepper" },
        steps.map((s, i) => h("li", {
          key: i,
          className: cx("ds-stepper__step", i === current && "is-active", i < current && "is-complete"),
          "aria-current": i === current ? "step" : undefined,
        },
          h("span", { className: "ds-stepper__marker" }, i + 1),
          h("span", { className: "ds-stepper__label" }, s.label)
        ))
      )
    ),
    h("div", { className: "ds-wizard__panel" }, step.content),
    h("div", { className: "ds-wizard__footer" },
      h("button", {
        type: "button",
        className: "ds-button",
        disabled: isFirst || undefined,
        onClick: () => goTo(current - 1),
      }, "Back"),
      h("div", { className: "ds-wizard__footer-actions" },
        h("button", {
          type: "button",
          className: "ds-button ds-button--primary",
          disabled: (!isLast && nextDisabled) || undefined,
          onClick: onNext,
        }, isLast ? "Finish" : "Next")
      )
    )
  );
});
