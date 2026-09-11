import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@diametral/design-system/react"
import type { ComponentProps } from "react"

export default function ButtonGroupPlayground(
  props: ComponentProps<typeof ButtonGroup>
) {
  return (
    <ButtonGroup {...props}>
      <ButtonGroupText className="tracking-widest uppercase">
        Clipboard
      </ButtonGroupText>
      <Button>Copy</Button>
      <ButtonGroupSeparator />
      <Button>Paste</Button>
    </ButtonGroup>
  )
}
