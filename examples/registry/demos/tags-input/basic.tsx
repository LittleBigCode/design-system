import { TagsInput } from "@diametral/design-system/react"

export default function TagsInputBasic() {
  return (
    <TagsInput
      defaultValue={["ingest", "nightly", "eu-west-3"]}
      placeholder="Add a tag…"
    />
  )
}
