import * as React from "react"
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  FieldLabel,
} from "@diametral/design-system/react"

const LABELS = [
  { value: "bug", label: "Bug" },
  { value: "docs", label: "Docs" },
  { value: "a11y", label: "Accessibility" },
  { value: "tokens", label: "Tokens" },
]

export default function CheckboxGroupFilters() {
  const [active, setActive] = React.useState(["bug"])

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <CheckboxGroup
        value={active}
        onValueChange={setActive}
        className="flex-row flex-wrap gap-x-6"
      >
        {LABELS.map((item) => (
          <Field key={item.value} orientation="horizontal" className="w-auto">
            <Checkbox id={`checkbox-filter-${item.value}`} value={item.value} />
            <FieldLabel htmlFor={`checkbox-filter-${item.value}`}>
              {item.label}
            </FieldLabel>
          </Field>
        ))}
      </CheckboxGroup>
      <div className="flex items-center justify-between border-t pt-3 text-sm text-muted-foreground">
        <span>
          {active.length} of {LABELS.length} labels shown
        </span>
        <Button
          size="sm"
          variant="ghost"
          disabled={active.length === 0}
          onClick={() => setActive([])}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
