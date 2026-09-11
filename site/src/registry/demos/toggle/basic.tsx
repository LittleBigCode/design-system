import { Toggle } from "@diametral/design-system/react"
import { TextBIcon } from "@phosphor-icons/react"

export default function ToggleBasic() {
  return (
    <Toggle defaultPressed>
      <TextBIcon /> Bold
    </Toggle>
  )
}
