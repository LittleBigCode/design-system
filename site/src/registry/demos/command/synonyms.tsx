import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@diametral/design-system/react"

const COMMANDS = [
  { label: "Open billing", keywords: ["invoice", "payment", "plan", "vat"] },
  { label: "Toggle dark mode", keywords: ["theme", "appearance", "night"] },
  { label: "Invite teammate", keywords: ["member", "seat", "people"] },
  { label: "Rotate API key", keywords: ["token", "secret", "credentials"] },
]

export default function CommandSynonyms() {
  return (
    <Command className="w-full max-w-sm border border-border">
      <CommandInput placeholder="Search for invoice, night, token…" />
      <CommandList>
        <CommandEmpty>No command matches.</CommandEmpty>
        <CommandGroup heading="Workspace">
          {COMMANDS.map((command) => (
            <CommandItem key={command.label} keywords={command.keywords}>
              {command.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
