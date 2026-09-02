declare module "virtual:demo-source" {
  /** Keyed by `<slug>/<demo-name>`, populated by the demo-source Vite plugin. */
  export const sources: Record<string, { code: string; html: string }>

  /** The shiki themes' own colours, so runtime highlighting matches build-time. */
  export const palette: Record<
    "light" | "dark",
    Record<"fg" | "faint" | "keyword" | "string" | "tag" | "attr", string>
  >

  /** Variant axes parsed from each component's bound `cva()` const, by slug. */
  export const variants: Record<
    string,
    { variants: Record<string, string[]>; defaults: Record<string, string> }
  >

  /** The JSX each playground file renders, still holding its `{...props}`. */
  export const templates: Record<string, string>

  /** Composition grammar per slug, merged from demos, playground and source. */
  export const anatomy: Record<
    string,
    import("../../plugins/extract-anatomy").Anatomy
  >

  /** Why a part appears nowhere, keyed `<slug>/<Part>`; the build gate's exceptions. */
  export const anatomyExceptions: Record<string, string>
}
