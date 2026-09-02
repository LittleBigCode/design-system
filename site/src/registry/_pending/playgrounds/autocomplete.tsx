import type { ComponentProps } from "react"

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
  AutocompleteSeparator,
  AutocompleteStatus,
} from "@diametral/ui/components/autocomplete"

type Family = { value: string; items: string[] }

const TAGS: Family[] = [
  { value: "Foundations", items: ["colour", "tokens", "typography"] },
  { value: "Practice", items: ["accessibility", "charter"] },
]

const COUNT = TAGS.reduce((total, family) => total + family.items.length, 0)

export default function AutocompletePlayground(
  props: ComponentProps<typeof AutocompleteInput>
) {
  return (
    <Autocomplete items={TAGS}>
      <AutocompleteInput
        className="w-full max-w-3xs"
        placeholder="Start typing…"
        {...props}
      />
      <AutocompleteContent>
        <AutocompleteEmpty>No suggestion.</AutocompleteEmpty>
        <AutocompleteList>
          {(family: Family) => (
            <AutocompleteGroup key={family.value} items={family.items}>
              <AutocompleteLabel>{family.value}</AutocompleteLabel>
              <AutocompleteCollection>
                {(tag: string) => (
                  <AutocompleteItem key={tag} value={tag}>
                    {tag}
                  </AutocompleteItem>
                )}
              </AutocompleteCollection>
            </AutocompleteGroup>
          )}
        </AutocompleteList>
        <AutocompleteSeparator />
        <AutocompleteStatus>{COUNT} tags</AutocompleteStatus>
      </AutocompleteContent>
    </Autocomplete>
  )
}
