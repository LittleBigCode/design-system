"use client";

import * as React from "react";

import { cx } from "../lib/cx.js";
import { useControllableValue } from "../hooks/useControllableValue.js";
import { Input } from "../index.js";
import { Select } from "./Select.js";

/* PhoneInput — a dial-code select joined to a national-number field.
   ---------------------------------------------------------------------------
   The value is one string, always `+<dial><national>`, because that is what a
   database column and an SMS gateway both want. The split into country and
   national parts is derived on every render rather than stored, so a value
   arriving from an API lands on the right country with no effect to sync.

   A small hand-rolled dial-code table, no `libphonenumber` — the same
   trade-off as `qr-code`'s hand-rolled encoder in batch 2. It covers
   Diametral's live markets and is a plain array a consumer can read.

   Two forward cross-batch imports re-wired, both to be paid again in batch 7.
   `Input` is this package's `.ds-input`. `Select` is the bigger change: the
   source composes a five-part Base UI select (`Select`/`SelectTrigger`/
   `SelectContent`/`SelectItem`/`SelectValue`), and the incumbent is a native
   `<select>` taking its options as a prop — so the five parts collapse into one
   `options` array. The native control is arguably the better fit here anyway:
   a dial-code picker is exactly the case where a platform select's own mobile
   UI beats a custom listbox.

   That collapse is also what dissolves this batch's largest dedupe exception.
   Upstream the trigger kept `w-fit shrink-0 border-0 ps-0 pe-2` and the input
   `flex-1 border-0 ps-2` literal, because `select.css` and `input.css` kept
   their own competing defaults literal in turn so tailwind-merge could delete
   the loser. Nothing here is literal: `.ds-phone-input__country` and
   `__number` carry those overrides as real declarations and win on
   specificity. */
const COUNTRIES = [
  { code: "FR", label: "France", dialCode: "+33" },
  { code: "BE", label: "Belgique", dialCode: "+32" },
  { code: "CH", label: "Suisse", dialCode: "+41" },
  { code: "LU", label: "Luxembourg", dialCode: "+352" },
  { code: "DE", label: "Allemagne", dialCode: "+49" },
  { code: "ES", label: "Espagne", dialCode: "+34" },
  { code: "IT", label: "Italie", dialCode: "+39" },
  { code: "GB", label: "Royaume-Uni", dialCode: "+44" },
  { code: "US", label: "États-Unis", dialCode: "+1" },
  { code: "CA", label: "Canada", dialCode: "+1" },
] as const;

export type CountryCode = (typeof COUNTRIES)[number]["code"];

// Longest dial code first, so `+1` does not shadow a hypothetical longer match.
const BY_DIAL_CODE = [...COUNTRIES].sort(
  (a, b) => b.dialCode.length - a.dialCode.length
);

function splitValue(phone: string, fallback: CountryCode) {
  const match = BY_DIAL_CODE.find((country) =>
    phone.startsWith(country.dialCode)
  );
  if (!match) {
    return { country: fallback, national: phone.replace(/^\+/, "") };
  }
  return { country: match.code, national: phone.slice(match.dialCode.length) };
}

export interface PhoneInputProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  defaultCountry?: CountryCode;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

function PhoneInput({
  className,
  value,
  defaultValue = "",
  onValueChange,
  defaultCountry = "FR",
  disabled = false,
  placeholder = "6 12 34 56 78",
}: PhoneInputProps) {
  const [phone, setPhone] = useControllableValue<string>({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const { country, national } = splitValue(phone, defaultCountry);
  const dialCode =
    COUNTRIES.find((c) => c.code === country)?.dialCode ?? COUNTRIES[0].dialCode;

  const setCountry = (next: string) => {
    if (!next) return;
    const nextDialCode =
      COUNTRIES.find((c) => c.code === next)?.dialCode ?? dialCode;
    setPhone(`${nextDialCode}${national}`);
  };

  const setNational = (next: string) => {
    setPhone(`${dialCode}${next.replace(/[^\d\s]/g, "")}`);
  };

  return (
    <div
      data-slot="phone-input"
      data-disabled={disabled || undefined}
      className={cx("ds-phone-input", className)}
    >
      <Select
        data-slot="phone-input-country"
        aria-label="Country calling code"
        className="ds-phone-input__country"
        // The label is the dial code, because that is what the collapsed
        // trigger has room for; the option text carries the country name.
        options={COUNTRIES.map((c) => ({
          value: c.code,
          label: `${c.label} (${c.dialCode})`,
        }))}
        value={country}
        disabled={disabled}
        onChange={(event) => setCountry(event.target.value)}
      />
      <Input
        data-slot="phone-input-number"
        type="tel"
        inputMode="tel"
        aria-label="Phone number"
        className="ds-phone-input__number"
        value={national}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => setNational(event.target.value)}
      />
    </div>
  );
}

export { PhoneInput };
