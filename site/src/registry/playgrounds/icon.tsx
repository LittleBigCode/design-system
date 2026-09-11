import { Icon } from "@diametral/design-system/react"

// `name` is what an icon *is*, so it is declared `always` — a snippet that
// omitted it would not compile. `size`/`title` are gone from the 1.0.0 API:
// sizing is `.ds-icon`'s CSS (font-size), and an accessible name is
// `aria-label`/`role="img"` passed straight through.
export default function IconPlayground({
  name = "search",
}: {
  name?: string
}) {
  return <Icon name={name} />
}
