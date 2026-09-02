import { Toggle } from "@diametral/design-system/react"
import type { ComponentProps } from "react"
import { TextBIcon } from "@phosphor-icons/react"

export default function TogglePlayground(props: ComponentProps<typeof Toggle>) {
  return (
    <Toggle aria-label="Bold" {...props}>
      <TextBIcon />
    </Toggle>
  )
}
