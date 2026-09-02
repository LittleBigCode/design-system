import { ArrowRightIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@diametral/ui/components/button-group"
import { Input } from "@diametral/ui/components/input"

export default function ButtonGroupWithText() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <ButtonGroup>
        <ButtonGroupText>diametral.com/</ButtonGroupText>
        <Input defaultValue="charte" aria-label="Slug" />
      </ButtonGroup>

      <ButtonGroup>
        <Input placeholder="you@diametral.com" aria-label="Email" />
        <Button variant="outline" aria-label="Continue">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}
