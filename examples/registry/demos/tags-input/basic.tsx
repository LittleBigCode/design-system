import { TagInput } from "@diametral/design-system/react"

export default function TagsInputBasic() {
  return (
    <TagInput
      defaultValue={["ingest", "nightly", "eu-west-3"]}
      placeholder="Add a tag…"
    />
  )
}
