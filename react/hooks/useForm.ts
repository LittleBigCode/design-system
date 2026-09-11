/* ============================================================================
   Diametral Design System — useForm
   ----------------------------------------------------------------------------
   A tiny, dependency-free form-state hook for building validated forms on top
   of the DS fields (Input / Select / Textarea / Checkbox / Switch …).

   Plain ES module authored with React only — no build step, no external deps.

       import { useForm } from "@diametral/design-system/react";

       const form = useForm({
         initialValues: { name: "", visibility: "private" },
         validate: (v) => {
           const e = {};
           if (!v.name.trim()) e.name = "Name is required";
           return e;                       // empty object === valid
         },
       });

   `register(name)` returns props to spread onto a DS field; `handleSubmit`
   returns an onSubmit handler for the <form>. See docs/forms.md.
   ============================================================================ */
import React from "react";

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
const { useState, useCallback } = React;

export function useForm<Values extends Record<string, any>>(
  { initialValues = {} as Values, validate }: UseFormOptions<Values> = {} as UseFormOptions<Values>,
) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Flips true on the first submit so errors show even on untouched fields.
  const [submitted, setSubmitted] = useState(false);

  const runValidate = useCallback(
    (vals: any) => (typeof validate === "function" ? validate(vals) || {} : {}),
    [validate]
  );

  const setValue = useCallback((name: any, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldTouched = useCallback((name: any) => {
    setTouched((prev: any) => (prev[name] ? prev : { ...prev, [name]: true }));
  }, []);

  // Props to spread onto a DS Input / Select / Textarea.
  // onChange reads e.target.checked for checkboxes, else e.target.value.
  const register = useCallback(
    (name: any) => ({
      name,
      value: values[name] ?? "",
      onChange: (e: any) => {
        const t = e && e.target;
        const next = t && t.type === "checkbox" ? t.checked : t ? t.value : e;
        setValue(name, next);
      },
      onBlur: () => setFieldTouched(name),
    }),
    [values, setValue, setFieldTouched]
  );

  const handleSubmit = useCallback(
    (onValid: any) => async (e: any) => {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      setSubmitted(true);
      // Mark every known field touched so all messages surface at once.
      const keys = Object.keys({ ...initialValues, ...values });
      setTouched(keys.reduce<Record<string, boolean>>((acc, k) => ((acc[k] = true), acc), {}));

      const nextErrors = runValidate(values);
      if (Object.keys(nextErrors).length > 0) return;

      try {
        setIsSubmitting(true);
        if (typeof onValid === "function") await onValid(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, initialValues, runValidate]
  );

  const reset = useCallback(
    (nextValues: any) => {
      setValues(nextValues !== undefined ? nextValues : initialValues);
      setTouched({});
      setIsSubmitting(false);
      setSubmitted(false);
    },
    [initialValues]
  );

  // Errors are *derived* from the current values on every render, so a field
  // shows the right message the moment it changes — then gated for display so
  // a message only appears once the field is touched OR a submit was attempted.
  const allErrors: Record<string, string> = runValidate(values);
  const errors: Record<string, string> = {};
  for (const key of Object.keys(allErrors)) {
    if (submitted || touched[key]) errors[key] = allErrors[key];
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    register,
    handleSubmit,
    reset,
  };
}
