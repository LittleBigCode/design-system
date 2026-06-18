import type { ChangeEvent, FocusEvent, FormEvent } from "react";

/** A map of field name -> error message. An empty object means "valid". */
export type FormErrors<Values> = Partial<Record<keyof Values, string>>;

/** A map of field name -> whether the field has been blurred/visited. */
export type FormTouched<Values> = Partial<Record<keyof Values, boolean>>;

/** Props returned by `register(name)`, ready to spread onto a DS field. */
export interface FieldRegistration {
  name: string;
  value: unknown;
  onChange: (event: ChangeEvent<any>) => void;
  onBlur: (event?: FocusEvent<any>) => void;
}

export interface UseFormOptions<Values> {
  /** Starting values; also defines the known field set for `handleSubmit`. */
  initialValues: Values;
  /**
   * Synchronous validator. Receives the current values and returns an errors
   * object (`{ field: message }`). Return an empty object when everything is
   * valid. Omit to skip validation entirely.
   */
  validate?: (values: Values) => FormErrors<Values>;
}

export interface UseFormReturn<Values> {
  /** Current field values. */
  values: Values;
  /**
   * Validation errors, filtered to fields that are `touched` OR have been
   * through a submit attempt — i.e. the errors you should render.
   */
  errors: FormErrors<Values>;
  /** Which fields have been blurred or marked touched on submit. */
  touched: FormTouched<Values>;
  /** True while an async `onValid` handler is running. */
  isSubmitting: boolean;
  /** Imperatively set a single field value. */
  setValue: <K extends keyof Values>(name: K, value: Values[K]) => void;
  /** Returns `{ name, value, onChange, onBlur }` to spread onto a DS field. */
  register: (name: keyof Values & string) => FieldRegistration;
  /**
   * Returns a form `onSubmit` handler. It prevents default, marks all fields
   * touched, validates, and — if valid — awaits `onValid(values)` while
   * toggling `isSubmitting`. If invalid, it sets `errors` and does not call
   * `onValid`.
   */
  handleSubmit: (
    onValid: (values: Values) => void | Promise<void>
  ) => (event?: FormEvent<HTMLFormElement>) => Promise<void>;
  /** Reset to `initialValues` (or to `nextValues` when provided). */
  reset: (nextValues?: Values) => void;
}

/** Tiny, dependency-free form-state hook for the Diametral DS fields. */
export declare function useForm<Values extends Record<string, any>>(
  options: UseFormOptions<Values>
): UseFormReturn<Values>;
