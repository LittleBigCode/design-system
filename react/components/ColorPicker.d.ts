import type { HTMLAttributes } from "react";

/** The Diametral brand palette (charter-canonical) plus white. */
export declare const BRAND_SWATCHES: string[];

export interface ColorPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled value — a hex color string (e.g. `#ff2a00`). */
  value?: string;
  /** Uncontrolled initial value — a hex color string. Defaults to `#161616`. */
  defaultValue?: string;
  /** Fires with the new hex color when a swatch, the hex field, or the native input changes. */
  onChange?: (value: string) => void;
  /** Swatch colors to display. Defaults to {@link BRAND_SWATCHES}. */
  swatches?: string[];
  /** Disable the control. */
  disabled?: boolean;
  /** Name forwarded to the hex input. */
  name?: string;
}

export declare function ColorPicker(props: ColorPickerProps): JSX.Element;
