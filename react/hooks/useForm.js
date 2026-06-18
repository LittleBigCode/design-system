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
const { useState, useCallback } = React;

export function useForm({ initialValues = {}, validate } = {}) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Flips true on the first submit so errors show even on untouched fields.
  const [submitted, setSubmitted] = useState(false);

  const runValidate = useCallback(
    (vals) => (typeof validate === "function" ? validate(vals) || {} : {}),
    [validate]
  );

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldTouched = useCallback((name) => {
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
  }, []);

  // Props to spread onto a DS Input / Select / Textarea.
  // onChange reads e.target.checked for checkboxes, else e.target.value.
  const register = useCallback(
    (name) => ({
      name,
      value: values[name] ?? "",
      onChange: (e) => {
        const t = e && e.target;
        const next = t && t.type === "checkbox" ? t.checked : t ? t.value : e;
        setValue(name, next);
      },
      onBlur: () => setFieldTouched(name),
    }),
    [values, setValue, setFieldTouched]
  );

  const handleSubmit = useCallback(
    (onValid) => async (e) => {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      setSubmitted(true);
      // Mark every known field touched so all messages surface at once.
      const keys = Object.keys({ ...initialValues, ...values });
      setTouched(keys.reduce((acc, k) => ((acc[k] = true), acc), {}));

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
    (nextValues) => {
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
  const allErrors = runValidate(values);
  const errors = {};
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
