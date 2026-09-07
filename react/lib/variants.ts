import { cx, type ClassValue } from "./cx.js";

/* cva's shape without cva.
   ---------------------------------------------------------------------------
   ADR 0001 declined class-variance-authority: every absorbed component's cva
   call resolves a variant map to class names and nothing else, and half of them
   carry empty option values because the styling is keyed off a `data-*`
   attribute in CSS instead. So the dep buys a resolver we can write in ten
   lines.

   The *declaration* stays cva-shaped on purpose. The docs site parses these
   axes out of the component file at build time to drive each playground's
   control panel (site/plugins/extract-variants.ts), so a component that
   declared its variants any other way would silently lose its controls — or
   force the axes to be restated in site/src/registry/playgrounds.ts, which is
   the duplication that file exists to avoid. */
export type VariantSpec = {
  /** Axis name -> option name -> the class that option applies (may be ""). */
  variants: Record<string, Record<string, string>>;
  defaultVariants?: Record<string, string>;
};

type Props = Record<string, string | null | undefined> & {
  className?: ClassValue;
};

/** Returns the resolver `cva(base, spec)` would have: it takes the chosen
 *  options plus an optional `className` and joins the classes they select. */
export function variants(base: string, spec: VariantSpec) {
  return function resolve(props: Props = {}) {
    const picked = Object.entries(spec.variants).map(([axis, options]) => {
      const choice = props[axis] ?? spec.defaultVariants?.[axis];
      return choice == null ? undefined : options[choice];
    });
    return cx(base, ...picked, props.className);
  };
}
