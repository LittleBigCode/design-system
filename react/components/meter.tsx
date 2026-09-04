"use client";

import { Meter as MeterPrimitive } from "@base-ui/react/meter";

import { bcx } from "../lib/baseClass.js";
import { variants } from "../lib/variants.js";

/* Meter — a labelled bar reporting a static measurement.
   ---------------------------------------------------------------------------
   Disk used, quota spent, a score out of a maximum. Not a `Progress`: nothing
   is advancing, so there is no indeterminate state. And not `Metric`, whose
   alias the react-ledger withdrew — Metric is a label/value text pair with a
   sign tone, this is a control with `role="meter"` and a track.

   `<Meter>` renders its own track and indicator after `children`, so the
   common case is `<Meter><MeterLabel/><MeterValue/></Meter>` and the bar
   appears under the row without being asked for. That is also why `tone` rides
   the root as `--tone`: a caller composing the shorthand never gets a handle on
   the indicator to colour it. The six keys are the system's status family;
   left unset the bar paints --ds-accent. */
const meterVariants = variants("ds-meter", {
  variants: {
    tone: {
      neutral: "ds-meter--tone-neutral",
      success: "ds-meter--tone-success",
      warning: "ds-meter--tone-warning",
      danger: "ds-meter--tone-danger",
      critical: "ds-meter--tone-critical",
      info: "ds-meter--tone-info",
    },
  },
});

export type MeterTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "critical"
  | "info";

function Meter({
  className,
  children,
  tone,
  ...props
}: MeterPrimitive.Root.Props & { tone?: MeterTone }) {
  return (
    <MeterPrimitive.Root
      data-slot="meter"
      className={bcx(meterVariants({ tone }), className)}
      {...props}
    >
      {children}
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </MeterPrimitive.Root>
  );
}

function MeterTrack({ className, ...props }: MeterPrimitive.Track.Props) {
  return (
    <MeterPrimitive.Track
      data-slot="meter-track"
      className={bcx("ds-meter-track", className)}
      {...props}
    />
  );
}

function MeterIndicator({
  className,
  ...props
}: MeterPrimitive.Indicator.Props) {
  return (
    <MeterPrimitive.Indicator
      data-slot="meter-indicator"
      className={bcx("ds-meter-indicator", className)}
      {...props}
    />
  );
}

function MeterLabel({ className, ...props }: MeterPrimitive.Label.Props) {
  return (
    <MeterPrimitive.Label
      data-slot="meter-label"
      className={bcx("ds-meter-label", className)}
      {...props}
    />
  );
}

function MeterValue({ className, ...props }: MeterPrimitive.Value.Props) {
  return (
    <MeterPrimitive.Value
      data-slot="meter-value"
      className={bcx("ds-meter-value", className)}
      {...props}
    />
  );
}

export { Meter, MeterTrack, MeterIndicator, MeterLabel, MeterValue, meterVariants };
