import type { ComponentProps } from "react"

import { Snippet } from "@diametral/design-system/react"

export default function SnippetPlayground({
  value = "npm i @diametral/design-system",
  ...props
}: Omit<ComponentProps<typeof Snippet>, "value"> & { value?: string }) {
  return <Snippet value={value} {...props} />
}
