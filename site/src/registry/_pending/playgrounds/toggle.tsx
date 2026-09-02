import type { ComponentProps } from "react"
import { TextBIcon } from "@phosphor-icons/react"

import { Toggle } from "@diametral/ui/components/toggle"

export default function TogglePlayground(props: ComponentProps<typeof Toggle>) {
  return (
    <Toggle aria-label="Bold" {...props}>
      <TextBIcon />
    </Toggle>
  )
}
