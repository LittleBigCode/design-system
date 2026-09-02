import { TextBIcon } from "@phosphor-icons/react"

import { Toggle } from "@diametral/ui/components/toggle"

export default function ToggleBasic() {
  return (
    <Toggle defaultPressed>
      <TextBIcon /> Bold
    </Toggle>
  )
}
