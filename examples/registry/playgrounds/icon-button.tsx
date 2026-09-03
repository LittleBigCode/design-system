import { IconButton } from "@diametral/design-system/react"
import type { ComponentProps } from "react"
import { PencilSimpleIcon } from "@phosphor-icons/react"

export default function IconButtonPlayground(
  props: Omit<ComponentProps<typeof IconButton>, "label" | "children">
) {
  return (
    <IconButton label="Rename" {...props}>
      <PencilSimpleIcon />
    </IconButton>
  )
}
