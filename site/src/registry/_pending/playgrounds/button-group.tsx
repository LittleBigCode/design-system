import type { ComponentProps } from "react"

import { Button } from "@diametral/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@diametral/ui/components/button-group"

export default function ButtonGroupPlayground(
  props: ComponentProps<typeof ButtonGroup>
) {
  return (
    <ButtonGroup {...props}>
      <ButtonGroupText className="uppercase tracking-widest">
        Clipboard
      </ButtonGroupText>
      <Button variant="outline">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Paste</Button>
    </ButtonGroup>
  )
}
