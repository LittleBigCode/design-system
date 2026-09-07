import * as React from "react"

import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@diametral/design-system/react"

const COMMANDS = [
  { id: "new-project", label: "New project", group: "Create", hint: "⌘N" },
  { id: "new-dataset", label: "New dataset", group: "Create" },
  { id: "goto-billing", label: "Billing", group: "Go to" },
  { id: "goto-audit", label: "Audit log", group: "Go to" },
  { id: "invite", label: "Invite a teammate", group: "Team" },
]

const GROUPS = [...new Set(COMMANDS.map((command) => command.group))]

export default function CommandBasic() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open command palette</Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command palette"
        description="Search for a command to run"
      >
        <CommandInput placeholder="Type a command…" />
        <CommandList>
          <CommandEmpty>No commands found.</CommandEmpty>
          {GROUPS.map((group) => (
            <CommandGroup key={group} heading={group}>
              {COMMANDS.filter((command) => command.group === group).map(
                (command) => (
                  <CommandItem
                    key={command.id}
                    value={command.label}
                    onSelect={() => setOpen(false)}
                  >
                    {command.label}
                    {command.hint && (
                      <CommandShortcut>{command.hint}</CommandShortcut>
                    )}
                  </CommandItem>
                )
              )}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
