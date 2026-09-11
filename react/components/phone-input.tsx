"use client";

import * as React from "react";

import { cx } from "../lib/cx.js";
import { useControllableValue } from "../hooks/useControllableValue.js";
import { Input } from "./input.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select.js";

/* PhoneInput — a dial-code select joined to a national-number field.
   ---------------------------------------------------------------------------
   The value is one string, always `+<dial><national>`, because that is what a
   database column and an SMS gateway both want. The split into country and
   national parts is derived on every render rather than stored, so a value
   arriving from an API lands on the right country with no effect to sync.

   A small hand-rolled dial-code table, no `libphonenumber` — the same
   trade-off as `qr-code`'s hand-rolled encoder in batch 2. It covers
   Diametral's live markets and is a plain array a consumer can read.

   Both forward cross-batch imports are re-wired **back** in 1.0.0-beta.7, the
   second and final half of each: `Input` and the five-part `Select` are the
   source's own now, not the incumbents batch 3 composed onto. The dial-code
   picker gains what the native `<select>` could not show — the country name
   beside the code in the list, while the closed trigger stays as narrow as
   `+352`.

   The dedupe exception this file dissolved in beta.3 stays dissolved. Upstream
   the trigger kept `w-fit shrink-0 border-0 ps-0 pe-2` and the input `flex-1
   border-0 ps-2` literal, because `select.css` and `input.css` kept their own
   competing defaults literal in turn so tailwind-merge could delete the loser.
   Nothing here is literal: `.ds-phone-input__country` and `__number` carry
   those overrides as real declarations and win on specificity. */
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
        value={country}
        disabled={disabled}
        onValueChange={(next) => setCountry(next ?? "")}
      >
        <SelectTrigger
          data-slot="phone-input-country"
          aria-label="Country calling code"
          className="ds-phone-input__country"
        >
          {/* The trigger shows the dial code, because that is all a collapsed
              trigger has room for; the list carries the country name. */}
          <SelectValue>{() => dialCode}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {COUNTRIES.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              {c.label} ({c.dialCode})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
