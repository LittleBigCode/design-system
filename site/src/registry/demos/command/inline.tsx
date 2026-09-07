import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@diametral/design-system/react"

const RECENT = ["New project", "New dataset"]
const ALL = ["Billing", "Audit log", "Invite a teammate"]

export default function CommandInline() {
  return (
    <Command className="w-72 border border-border">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No commands found.</CommandEmpty>
        <CommandGroup heading="Recent">
          {RECENT.map((label) => (
            <CommandItem key={label} value={label}>
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="All commands">
          {ALL.map((label) => (
            <CommandItem key={label} value={label}>
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
