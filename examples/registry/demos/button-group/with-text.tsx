import {
  Button,
  ButtonGroup,
  ButtonGroupText,
  Input,
} from "@diametral/design-system/react"
import { ArrowRightIcon } from "@phosphor-icons/react"

export default function ButtonGroupWithText() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <ButtonGroup>
        <ButtonGroupText>diametral.com/</ButtonGroupText>
        <Input defaultValue="charte" aria-label="Slug" />
      </ButtonGroup>

      <ButtonGroup>
        <Input placeholder="you@diametral.com" aria-label="Email" />
        <Button aria-label="Continue">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}
