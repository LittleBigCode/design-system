"use client";

import * as React from "react";

import { cx } from "../lib/cx.js";
import { variants } from "../lib/variants.js";

/* Wordmark — the Diametral lockup.
   ---------------------------------------------------------------------------
   Replaces the geometric construction this package shipped since 0.2 — a
   circle, a square and a diagonal line, the brand's three elements drawn as
   primitives, and still what `assets/logo/diametral-mark.svg` holds. These are
   the produced lockups: the typographic wordmark, and the monogram that sets it
   inside the symbol. Both are `currentColor` paths, so ink colour recolours
   them and they invert with the theme for free.

   `assets/logo/` has not been re-cut to match, so the binding and that svg now
   draw different marks. That is a brand-asset call, not a code one.

   The lockups are inlined as JSX rather than imported from `assets/` with
   Vite's `?raw` suffix: `tsc` emits import specifiers verbatim, so a `?raw`
   import would ship into `dist` and only resolve under Vite, and every other
   component here is bundler-agnostic. `assets/` stays the canonical source for
   non-React consumers — the email templates, the Keycloak theme, raster
   exports.

   `label` is the accessible name, and passing `""` hides the mark from
   assistive tech: correct when it sits beside text that already says
   "Diametral", which is the one case where announcing it twice is worse than
   not announcing it at all.

   `name` and `sub` are kept from the incumbent, unlike the rest of its API.
   The source's Wordmark is the mark alone and has no equivalent for either,
   while `ConsoleLayout`, the Vite starter and `docs/migration.md`'s 0.x
   mapping table all read them — and `.ds-wordmark__name` / `__sub` are a
   published class contract. Dropping them would be a regression rather than an
   absorption, so they stay, and they render only when passed. A lockup with a
   product name beside it wants `variant="square"`: the horizontal wordmark
   already spells "Diametral", so pairing it with the word again says it
   twice. */

const HORIZONTAL_PATH =
  "M0 0h167.822q81.432 0 137.373 33.99 56.649 33.281 84.265 90.637 28.324 57.357 28.324 130.292T389.46 385.211q-27.616 57.357-84.265 91.346-55.941 33.28-137.373 33.281H0zm167.822 453.189q92.053 0 138.081-54.524 46.735-54.525 46.735-143.746t-46.735-143.746q-46.028-54.524-138.081-54.524H62.314v396.54zm291.237-311.567h59.481v368.216h-59.481zm0-141.622h59.481v79.308h-59.481zm219.585 518.335q-52.4 0-87.805-27.616-35.406-27.617-35.405-76.476 0-94.178 132.416-122.502l121.086-25.492v-21.243q0-31.866-21.951-45.319-21.243-14.163-60.897-14.163-41.779 0-69.395 15.579-27.616 15.578-27.616 53.816h-59.481q0-63.021 42.486-92.054 43.195-29.74 109.757-29.741 73.644 0 109.757 28.325 36.822 27.616 36.822 77.892v270.497h-56.649v-77.892q-12.746 41.07-48.86 63.73-35.405 22.659-84.265 22.659m14.163-48.859q29.032 0 55.232-11.33 26.908-11.33 43.903-34.697 16.995-24.077 16.994-59.481v-47.444l-112.589 28.325q-42.486 10.621-60.897 26.2-18.411 15.577-18.411 38.946 0 59.481 75.768 59.481m216.482-327.854h59.481v66.562q18.41-33.99 48.86-54.524c20.3-13.691 44.85-20.536 73.64-20.536 34.94 0 62.55 8.026 82.85 24.076s34.23 37.058 41.78 63.022c11.33-25.964 27.62-46.971 48.86-63.022 21.24-16.05 47.68-24.076 79.31-24.076q68.685 0 99.84 39.654c20.77 25.964 31.16 57.593 31.16 94.887v242.173h-59.48V273.33c0-26.436-7.56-47.443-22.66-63.022-15.11-15.578-37.53-23.367-67.27-23.367-21.25 0-42.96 7.081-65.15 21.243-22.19 13.69-34.93 39.89-38.24 78.6v223.054h-59.48V273.33c0-26.436-7.55-47.443-22.66-63.022-15.1-15.578-37.53-23.367-67.27-23.367-12.74 0-27.14 2.832-43.19 8.497q-23.37 8.498-42.489 34.697-18.411 26.2-18.411 73.644v206.059h-59.481zm778.851 376.713c-54.76 0-97.01-16.522-126.76-49.567-29.26-33.517-43.9-81.197-43.9-143.038s14.64-109.285 43.9-142.33c29.75-33.045 72-49.568 126.76-49.568 55.23 0 97.72 16.759 127.46 50.276q44.61 49.567 44.61 141.622v21.243h-283.25q4.965 58.065 33.99 89.222 29.745 30.448 80.73 30.448c25.96 0 47.44-5.9 64.43-17.702q25.5-18.41 36.12-64.438h60.19c-7.56 46.735-25.97 80.724-55.24 101.967-29.26 21.244-65.61 31.865-109.04 31.865m109.75-217.389c-3.3-36.822-14.4-65.146-33.28-84.973q-28.32-29.74-76.47-29.74t-77.19 29.74c-18.88 19.355-29.97 47.679-33.28 84.973zm155.48-106.924h-82.14v-52.4h82.14V56.649l59.48-35.406v120.379h84.98v52.4h-84.98v315.816h-59.48zm167.27-52.4h59.48v55.94c11.8-18.411 26.2-32.337 43.19-41.778q26.205-14.162 57.36-14.162h41.78v52.4h-36.12c-31.63 0-56.41 7.081-74.35 21.243q-26.205 21.243-31.86 70.811v223.762h-59.48zm339.48 376.713c-34.94 0-64.2-9.205-87.81-27.616q-35.4-27.617-35.4-76.476c0-62.785 44.14-103.619 132.41-122.502l121.09-25.492v-21.243c0-21.244-7.32-36.35-21.95-45.319q-21.24-14.163-60.9-14.163-41.775 0-69.39 15.579c-18.41 10.385-27.62 28.324-27.62 53.816h-59.48c0-42.014 14.16-72.699 42.49-92.054 28.79-19.827 65.38-29.741 109.75-29.741 49.1 0 85.68 9.442 109.76 28.325 24.55 18.411 36.82 44.375 36.82 77.892v270.497h-56.65v-77.892c-8.5 27.38-24.78 48.624-48.86 63.73-23.6 15.106-51.69 22.659-84.26 22.659m14.16-48.859c19.35 0 37.77-3.777 55.23-11.33 17.94-7.553 32.58-19.119 43.91-34.697 11.32-16.051 16.99-35.878 16.99-59.481v-47.444l-112.59 28.325q-42.48 10.621-60.9 26.2c-12.27 10.385-18.41 23.367-18.41 38.946 0 39.654 25.26 59.481 75.77 59.481M2750.24 0v509.838h-59.48V0z";

const SQUARE_FILL_PATH =
  "M0 716.165h102.373q52.586 0 88.71 22.033 36.581 21.573 54.415 58.754 18.291 37.18 18.291 84.459t-18.291 84.459c-11.889 24.787-30.028 44.52-54.415 59.21-24.083 14.39-53.653 21.58-88.71 21.58H0zm102.373 293.775c39.63 0 69.352-11.786 89.167-35.349q30.18-35.345 30.18-93.18t-30.18-93.18q-29.722-35.345-89.167-35.345H40.24v257.054zm188.069-201.972h38.411v238.692h-38.411zm0-91.803h38.411v51.41h-38.411zm141.8 336.005q-33.838 0-56.701-17.91c-15.243-11.93-22.864-28.46-22.864-49.57q0-61.05 85.51-79.41l78.193-16.525v-13.77q0-20.656-14.176-29.377-13.718-9.181-39.325-9.181-26.979 0-44.812 10.099-17.834 10.098-17.834 34.885h-38.41q0-40.853 27.436-59.672 27.893-19.28 70.877-19.279 47.555 0 70.876 18.361 23.778 17.901 23.778 50.492v175.347h-36.581v-50.495q-8.232 26.616-31.552 41.315c-15.242 9.79-33.381 14.69-54.415 14.69m9.145-31.68c12.499 0 24.388-2.45 35.667-7.34 11.585-4.9 21.035-12.39 28.351-22.493q10.975-15.607 10.975-38.558v-30.754l-72.706 18.361q-27.436 6.885-39.325 16.984-11.889 10.098-11.889 25.246 0 38.555 48.927 38.554m139.796-212.522h38.411v43.148q11.889-22.033 31.551-35.344 19.664-13.312 47.556-13.312 33.838 0 53.501 15.607t26.979 40.852q10.974-25.245 31.551-40.852t51.214-15.607q44.355 0 64.475 25.705 20.12 25.246 20.12 61.508v156.987H908.13V893.345q0-25.704-14.632-40.852t-43.441-15.148q-20.577 0-42.068 13.771-21.492 13.311-24.693 50.951v144.593h-38.411V893.345q0-25.704-14.632-40.852t-43.441-15.148q-12.346 0-27.893 5.509-15.09 5.508-27.436 22.491-11.889 16.984-11.889 47.738v133.577h-38.411zm502.947 244.202c-35.36 0-62.64-10.72-81.85-32.14q-28.349-32.585-28.349-92.717t28.349-92.263c19.21-21.42 46.49-32.131 81.85-32.131 35.67 0 63.11 10.864 82.31 32.59 19.21 21.421 28.81 52.022 28.81 91.804v13.77h-182.91c2.14 25.093 9.45 44.372 21.95 57.836 12.8 13.161 30.18 19.741 52.13 19.741 16.77 0 30.64-3.83 41.61-11.48 10.97-7.955 18.75-21.878 23.32-41.769h38.87q-7.32 45.443-35.67 66.099c-18.9 13.77-42.37 20.66-70.42 20.66m70.88-140.923c-2.13-23.869-9.3-42.23-21.49-55.082-12.2-12.852-28.66-19.279-49.39-19.279s-37.34 6.427-49.84 19.279c-12.19 12.546-19.36 30.907-21.49 55.082zm100.4-69.311h-53.04v-33.968h53.04v-55.082l38.41-22.95v78.032h54.87v33.968h-54.87v204.724h-38.41zm108.01-33.968h38.41v36.263c7.63-11.935 16.92-20.962 27.9-27.082 11.28-6.121 23.62-9.181 37.04-9.181h26.98v33.968h-23.33c-20.42 0-36.42 4.59-48.01 13.77q-16.92 13.77-20.58 45.902v145.052h-38.41zm219.23 244.202q-33.84 0-56.7-17.91c-15.25-11.93-22.87-28.46-22.87-49.57 0-40.7 28.51-67.17 85.51-79.41l78.2-16.525v-13.77c0-13.771-4.73-23.563-14.18-29.377-9.14-6.121-22.25-9.181-39.32-9.181q-26.985 0-44.82 10.099c-11.89 6.732-17.83 18.36-17.83 34.885h-38.41c0-27.235 9.14-47.126 27.44-59.672 18.59-12.853 42.22-19.279 70.87-19.279 31.71 0 55.33 6.12 70.88 18.361 15.85 11.934 23.78 28.765 23.78 50.492v175.347h-36.59v-50.495c-5.48 17.745-16 31.515-31.55 41.315-15.24 9.79-33.38 14.69-54.41 14.69m9.14-31.68c12.5 0 24.39-2.45 35.67-7.34 11.58-4.9 21.04-12.39 28.35-22.493q10.98-15.607 10.98-38.558v-30.754l-72.71 18.361q-27.435 6.885-39.33 16.984-11.88 10.098-11.88 25.246c0 25.704 16.31 38.554 48.92 38.554M1770 716.165v330.495h-38.41V716.165z";

const SQUARE_STROKE_PATH =
  "m1493.21 288.018-1185.22.001.001 374.94M1493.21 288.018l-374.94 374.941m374.94-374.941v374.941M307.991 1473.24H1493.21v-370.63M307.991 1473.24l370.629-370.63m-370.629 370.63v-370.63m1432.309 0c-96.76 371.41-434.44 645.56-836.153 645.56-401.711 0-739.39-274.15-836.149-645.56m.728-439.651c97.715-370 434.712-642.785 835.421-642.785 400.713 0 737.703 272.785 835.423 642.785";

const wordmarkVariants = variants("ds-wordmark", {
  variants: {
    variant: { horizontal: "", square: "" },
  },
  defaultVariants: {
    variant: "horizontal",
  },
});

export type WordmarkVariant = "horizontal" | "square";

export interface WordmarkProps
  extends Omit<React.ComponentProps<"span">, "children"> {
  variant?: WordmarkVariant;
  /** Accessible name for the mark. Pass `""` to hide it from assistive tech
   *  when it sits next to text that already says "Diametral". */
  label?: string;
  /** Optional product name set beside the mark. Pairs with `variant="square"`. */
  name?: React.ReactNode;
  /** Optional qualifier after the name — "Console", "Starter". */
  sub?: React.ReactNode;
}

function Wordmark({
  className,
  variant = "horizontal",
  label = "Diametral",
  name,
  sub,
  ...props
}: WordmarkProps) {
  // A mark beside a spelled-out name is decorative whatever `label` says: the
  // text carries the name, so announcing it again is a duplicate.
  const decorative = label === "" || name != null;

  return (
    <span
      data-slot="wordmark"
      data-variant={variant}
      className={wordmarkVariants({ variant, className })}
      {...props}
    >
      {variant === "square" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1770 1769"
          role={decorative ? undefined : "img"}
          aria-hidden={decorative || undefined}
        >
          {!decorative && <title>{label}</title>}
          <path fill="currentColor" d={SQUARE_FILL_PATH} />
          <path
            stroke="currentColor"
            strokeWidth="40.348"
            d={SQUARE_STROKE_PATH}
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 2751 519"
          role={decorative ? undefined : "img"}
          aria-hidden={decorative || undefined}
        >
          {!decorative && <title>{label}</title>}
          <path fill="currentColor" d={HORIZONTAL_PATH} />
        </svg>
      )}
      {name != null ? (
        <span className="ds-wordmark__name">{name}</span>
      ) : null}
      {sub != null ? <span className="ds-wordmark__sub">{sub}</span> : null}
    </span>
  );
}

export { Wordmark, wordmarkVariants };
