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

export declare const Stepper: ForwardRefExoticComponent<
  StepperProps & RefAttributes<HTMLOListElement>
>;
