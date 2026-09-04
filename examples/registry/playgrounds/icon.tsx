import { Icon } from "@diametral/design-system/react"

// `name` is what an icon *is*, so it is declared `always` — a snippet that
// omitted it would not compile.
export default function IconPlayground({
  name = "search",
  size = "32",
  title,
}: {
  name?: string
  size?: string
  title?: string
}) {
  return <Icon name={name} size={Number(size)} title={title} />
}
