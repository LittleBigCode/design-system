import type { SVGAttributes } from "react";
import type { icons } from "./icons.js";

/** Name of a built-in icon (a key of the `icons` map). */
export type IconName = keyof typeof icons;

export interface IconProps
  extends Omit<SVGAttributes<SVGSVGElement>, "name"> {
  /** Which icon to draw. Any key of the `icons` map; arbitrary strings are
   *  accepted too (an unknown name renders a blank SVG). */
  name: IconName | (string & {});
  /** Edge length. Number (px) or any CSS length. Defaults to "1em" so the icon
   *  follows the surrounding font-size. */
  size?: number | string;
  /** Stroke width of the line geometry. Defaults to 2 (the Lucide standard). */
  strokeWidth?: number | string;
  /** Accessible name. When set, the icon is exposed as role="img" with a
   *  <title>; when omitted the icon is decorative and aria-hidden. */
  title?: string;
}

/** A Lucide-compatible 24×24 stroked line icon. */
export declare function Icon(props: IconProps): JSX.Element;
