import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@diametral/ui/components/autocomplete"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"

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
