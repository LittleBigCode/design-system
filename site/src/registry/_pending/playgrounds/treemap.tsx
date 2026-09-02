import type { ComponentProps } from "react"

import { Treemap } from "@diametral/ui/components/treemap"

const DATA = [
  { name: "Search", value: 4200 },
  { name: "Checkout", value: 3100 },
  { name: "Catalogue", value: 2400 },
  { name: "Accounts", value: 1500 },
  { name: "Reviews", value: 900 },
  { name: "Support", value: 560 },
]

export default function TreemapPlayground(
  props: Partial<ComponentProps<typeof Treemap>>
) {
  return <Treemap data={DATA} {...props} />
}
