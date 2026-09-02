import * as React from "react"
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@diametral/ui/components/input-group"

export default function InputGroupWithButtons() {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <InputGroup>
        <InputGroupInput
          type={visible ? "text" : "password"}
          defaultValue="charte-2026"
          aria-label="Password"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((value) => !value)}
          >
            {visible ? <EyeSlashIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="you@diametral.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="outline">Invite</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
