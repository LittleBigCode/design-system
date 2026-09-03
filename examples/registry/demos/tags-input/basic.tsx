import { TagInput } from "@diametral/design-system/react"

/**
 * No label, because the component cannot take one: `TagInput` spreads its rest
 * props onto the wrapper `div`, so neither `id` nor `aria-label` reaches the
 * inner `input`. The a11y gate reports it on this page, which is where the fix
 * belongs.
 */
export default function TagsInputBasic() {
  return (
    <TagInput
      defaultValue={["ingest", "nightly", "eu-west-3"]}
      placeholder="Add a tag…"
    />
  )
}
