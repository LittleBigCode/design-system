import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  Field,
  FieldDescription,
  FieldLabel,
  useComboboxAnchor,
} from "@diametral/design-system/react"

const SCOPES = [
  "read:tokens",
  "write:tokens",
  "read:components",
  "write:components",
  "publish",
]

export default function ComboboxMultiple() {
  const anchor = useComboboxAnchor()

  return (
    <Field className="max-w-sm">
      <FieldLabel>Scopes</FieldLabel>
      <Combobox items={SCOPES} multiple defaultValue={["read:tokens"]}>
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(selected: string[]) =>
              selected.map((scope) => (
                <ComboboxChip key={scope}>{scope}</ComboboxChip>
              ))
            }
          </ComboboxValue>
          <ComboboxChipsInput placeholder="Add a scope…" />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No scope found.</ComboboxEmpty>
          <ComboboxList>
            {(scope: string) => (
              <ComboboxItem key={scope} value={scope}>
                {scope}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>Backspace removes the last chip.</FieldDescription>
    </Field>
  )
}
