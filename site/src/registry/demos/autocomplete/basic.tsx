import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@diametral/design-system/react"
import { Field, FieldHint } from "@diametral/design-system/react"

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
    <Field className="max-w-sm" label="Tag">
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
      <FieldHint>
        Pick a suggestion, or invent a new tag.
      </FieldHint>
    </Field>
  )
}
