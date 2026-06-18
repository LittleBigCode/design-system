import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface WizardStep {
  /** Label shown under the step's stepper marker. */
  label: ReactNode;
  /** Content rendered in the panel when this step is active. */
  content?: ReactNode;
  /** Disable the Next button while this step is active (e.g. invalid input). */
  disableNext?: boolean;
}

export interface WizardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The ordered steps. */
  steps: WizardStep[];
  /** Controlled active step index. */
  active?: number;
  /** Uncontrolled initial active step index. Defaults to 0. */
  defaultActive?: number;
  /** Fires when Back/Next move between steps, with the new index. */
  onStepChange?: (index: number) => void;
  /** Fires when Finish is pressed on the last step. */
  onFinish?: () => void;
}

export declare const Wizard: ForwardRefExoticComponent<
  WizardProps & RefAttributes<HTMLDivElement>
>;
