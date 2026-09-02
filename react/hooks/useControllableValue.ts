import * as React from "react";

/* The controlled/uncontrolled pattern, once.
   ---------------------------------------------------------------------------
   Track an uncontrolled fallback, defer to `value` the moment it is defined,
   and only write the fallback while uncontrolled — so a component supports
   both modes without branching, and a consumer switching from one to the other
   does not get a stale local value. `Editable` and `PhoneInput` land on it in
   1.0.0-beta.3; `Rating` hand-rolled the same thing and is a held component,
   so it is left alone. */
export function useControllableValue<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (value: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const current = value ?? uncontrolled;

  const setValue = React.useCallback(
    (next: T) => {
      if (value === undefined) setUncontrolled(next);
      onChange?.(next);
    },
    [value, onChange]
  );

  return [current, setValue];
}
