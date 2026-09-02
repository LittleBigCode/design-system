import type { ComponentProps } from "react"
import { PencilSimpleIcon } from "@phosphor-icons/react"

import { IconButton } from "@diametral/ui/components/icon-button"

export default function IconButtonPlayground(
  props: Omit<ComponentProps<typeof IconButton>, "label" | "children">
) {
  return (
    <IconButton label="Rename" {...props}>
      <PencilSimpleIcon />
    </IconButton>
  )
}
