import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteList,
} from "@diametral/ui/components/autocomplete"
import { Field, FieldLabel } from "@diametral/ui/components/field"

type Category = { value: string; items: string[] }

const GROUPED: Category[] = [
  { value: "Actions", items: ["Button", "Toggle", "Toolbar"] },
  { value: "Overlays", items: ["Dialog", "Popover", "Tooltip"] },
  { value: "Forms", items: ["Combobox", "Number Field", "Tags Input"] },
]

export default function AutocompleteGrouped() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Component</FieldLabel>
      <Autocomplete items={GROUPED}>
        <AutocompleteInput placeholder="Search components…" showClear />
        <AutocompleteContent>
          <AutocompleteEmpty>Nothing matches.</AutocompleteEmpty>
          <AutocompleteList>
            {(category: Category) => (
              <AutocompleteGroup key={category.value} items={category.items}>
                <AutocompleteLabel>{category.value}</AutocompleteLabel>
                <AutocompleteCollection>
                  {(name: string) => (
                    <AutocompleteItem key={name} value={name}>
                      {name}
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </Field>
  )
}
