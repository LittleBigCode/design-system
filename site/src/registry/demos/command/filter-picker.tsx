import * as React from "react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@diametral/design-system/react"

const OWNERS = ["Amélie Roux", "Bruno Sattler", "Chen Wei", "Dilan Kaya"]
const STAGES = ["Quoted", "In production", "Delivered"]

export default function CommandFilterPicker() {
  const [selected, setSelected] = React.useState(["Chen Wei", "Quoted"])

  const toggle = (value: string) =>
    setSelected((current) =>
      current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value]
    )

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Command className="border border-border">
        <CommandInput placeholder="Filter orders…" />
        <CommandList>
          <CommandEmpty>Nothing matches that filter.</CommandEmpty>
          <CommandGroup heading="Owner">
            {OWNERS.map((owner) => (
              <CommandItem
                key={owner}
                data-checked={selected.includes(owner)}
                onSelect={() => toggle(owner)}
              >
                {owner}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Stage">
            {STAGES.map((stage) => (
              <CommandItem
                key={stage}
                data-checked={selected.includes(stage)}
                onSelect={() => toggle(stage)}
              >
                {stage}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      <p className="text-sm text-muted-foreground">
        {selected.length} filter{selected.length === 1 ? "" : "s"} applied
      </p>
    </div>
  )
}
