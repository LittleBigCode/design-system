import * as React from "react"

import { Button, CommandPalette } from "@diametral/design-system/react"

const COMMANDS = [
  { id: "new-project", label: "New project", group: "Create", hint: "⌘N" },
  { id: "new-dataset", label: "New dataset", group: "Create" },
  { id: "goto-billing", label: "Billing", group: "Go to" },
  { id: "goto-audit", label: "Audit log", group: "Go to" },
  { id: "invite", label: "Invite a teammate", group: "Team" },
]

export default function CommandBasic() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open command palette</Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={COMMANDS}
      />
    </>
  )
}
