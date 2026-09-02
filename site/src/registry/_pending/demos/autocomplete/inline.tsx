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

const TIMEZONES = [
  "Africa/Casablanca",
  "America/New_York",
  "America/Sao_Paulo",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Europe/Berlin",
  "Europe/Lisbon",
  "Europe/Paris",
  "Pacific/Auckland",
]

export default function AutocompleteInline() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Timezone</FieldLabel>
      <Autocomplete items={TIMEZONES} mode="both" autoHighlight>
        <AutocompleteInput placeholder="Europe/Paris" showClear />
        <AutocompleteContent>
          <AutocompleteEmpty>No timezone matches.</AutocompleteEmpty>
          <AutocompleteList>
            {(zone: string) => (
              <AutocompleteItem key={zone} value={zone}>
                {zone}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
      <FieldDescription>
        Type eur and the rest of the first match appears in the field. Enter
        keeps it; carry on typing and it is replaced.
      </FieldDescription>
    </Field>
  )
}
