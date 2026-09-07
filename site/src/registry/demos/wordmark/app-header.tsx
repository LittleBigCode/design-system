import { Wordmark } from "@diametral/design-system/react"

/* The app-chrome composition, and the one place `name` and `sub` are for.
   They are the part of the 0.x Wordmark this component does not replace — the
   source's is the mark alone — and they pair with the `square` lockup, because
   the horizontal one already spells "Diametral" and setting it beside the word
   would say it twice. The mark drops out of the accessibility tree on its own
   whenever a name sits next to it.

   `--lg` is the modifier that replaced the source's literal `[&_svg]:size-6`
   override: the whole reason its cva kept the svg sizing as Tailwind classes
   was so this demo could dedupe against it through tailwind-merge. Both sides
   are real declarations now. */
export default function WordmarkAppHeader() {
  return (
    <header className="flex w-full max-w-sm items-center border border-border bg-card px-3 py-2">
      <Wordmark
        variant="square"
        className="ds-wordmark--lg"
        name="Diametral"
        sub="Console"
      />
      <span className="ms-auto text-sm text-muted-foreground">Docs</span>
    </header>
  )
}
