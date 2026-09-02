import { CaretDownIcon } from "@phosphor-icons/react"

import { Checkbox } from "@diametral/ui/components/checkbox"
import { CheckboxGroup } from "@diametral/ui/components/checkbox-group"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@diametral/ui/components/collapsible"
import { Field, FieldLabel } from "@diametral/ui/components/field"

const STATUSES = [
  { value: "draft", label: "Draft", count: 12 },
  { value: "sent", label: "Sent", count: 34 },
  { value: "paid", label: "Paid", count: 128 },
]

export default function CollapsibleFilterGroup() {
  return (
    <Collapsible defaultOpen className="w-full max-w-xs border border-border">
      <CollapsibleTrigger className="group/filter flex w-full items-center justify-between border border-transparent px-3 py-2 text-sm font-semibold outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30">
        Status
        <CaretDownIcon className="size-3.5 text-muted-foreground transition-transform group-aria-expanded/filter:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t border-border px-3 py-3">
        <CheckboxGroup defaultValue={["sent"]}>
          {STATUSES.map((status) => (
            <Field key={status.value} orientation="horizontal">
              <Checkbox
                id={`collapsible-filter-${status.value}`}
                value={status.value}
              />
              <FieldLabel htmlFor={`collapsible-filter-${status.value}`}>
                {status.label}
              </FieldLabel>
              <span className="text-xs text-muted-foreground tabular-nums">
                {status.count}
              </span>
            </Field>
          ))}
        </CheckboxGroup>
      </CollapsibleContent>
    </Collapsible>
  )
}
