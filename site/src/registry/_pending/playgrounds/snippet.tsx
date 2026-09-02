import type { ComponentProps } from "react"

import { Snippet } from "@diametral/ui/components/snippet"

export default function SnippetPlayground({
  value = "pnpm add @diametral/ui",
  ...props
}: Omit<ComponentProps<typeof Snippet>, "value"> & { value?: string }) {
  return <Snippet value={value} {...props} />
}
