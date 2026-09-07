import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  FieldLabel,
} from "@diametral/design-system/react"
import { Field, FieldDescription } from "@diametral/design-system/react"

const TAGS = [
  "accessibility",
  "animation",
  "charter",
  "colour",
  "documentation",
  "tokens",
  "typography",
]

export default function AutocompleteBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Tag</FieldLabel>
      <Autocomplete items={TAGS}>
        <AutocompleteInput placeholder="Start typing…" showClear />
        <AutocompleteContent>
          <AutocompleteEmpty>No suggestion.</AutocompleteEmpty>
          <AutocompleteList>
            {(tag: string) => (
              <AutocompleteItem key={tag} value={tag}>
                {tag}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
      <FieldDescription>
        Pick a suggestion, or invent a new tag.
      </FieldDescription>
    </Field>
  )
}
