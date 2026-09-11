import { cx } from "./cx.js";

/** Base UI's own `className`: either a string or a function of the part's state
 *  (`resolveClassName`). Every absorbed Base UI component takes it. */
export type BaseClassName<State> =
  | string
  | ((state: State) => string | undefined)
  | undefined;

/** `cx` for a Base UI part: merges the component's own `ds-*` class into
 *  whichever of the two forms the consumer passed, keeping the function form
 *  callable so a part can still style itself from its own state. */
export function bcx<State>(
  base: string,
  className: BaseClassName<State>,
): string | ((state: State) => string) {
  return typeof className === "function"
    ? (state: State) => cx(base, className(state))
    : cx(base, className);
}
