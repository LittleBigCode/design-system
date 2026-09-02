import {
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@diametral/design-system/react"
import { CaretDownIcon } from "@phosphor-icons/react"

const STATUSES = [
  { value: "draft", label: "Draft", count: 12 },
  { value: "sent", label: "Sent", count: 34 },
  { value: "paid", label: "Paid", count: 128 },
]

/* A filter facet: the case Collapsible is really for. A sidebar with six of
   these does not want six Accordions — each folds on its own, and several are
   open at once, which is exactly what Accordion's coordination forbids.

   The chevron turns off the trigger's own `aria-expanded`, so the state that
   drives the rotation is the same one assistive tech reads.

   `CheckboxGroup` is a source component that holds here; this package's
   `Checkbox` wraps its own text, so a `<fieldset>` with a shared `name` is the
   grouping — and the count sits outside the label so it is not read as part of
   the option's name. */
export default function CollapsibleFilterGroup() {
  return (
    <Collapsible defaultOpen className="w-full max-w-xs border border-border">
      <CollapsibleTrigger className="group/filter flex w-full items-center justify-between border border-transparent px-3 py-2 text-sm font-semibold outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        Status
        <CaretDownIcon className="size-3.5 text-muted-foreground transition-transform group-aria-expanded/filter:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t border-border px-3 py-3">
        <fieldset className="flex flex-col gap-2.5">
          <legend className="sr-only">Status</legend>
          {STATUSES.map((status) => (
            <div
              key={status.value}
              className="flex items-center justify-between gap-3"
            >
              <Checkbox name="status" defaultChecked={status.value === "sent"}>
                {status.label}
              </Checkbox>
              <span className="text-xs text-muted-foreground tabular-nums">
                {status.count}
              </span>
            </div>
          ))}
        </fieldset>
      </CollapsibleContent>
    </Collapsible>
  )
}
