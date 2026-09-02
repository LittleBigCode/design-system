import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
  Snippet,
} from "@diametral/design-system/react"

export default function SnippetInContext() {
  return (
    <DescriptionList className="w-full max-w-sm">
      <DescriptionTerm>API key</DescriptionTerm>
      <DescriptionDetail>
        <Snippet value="sk_example_000000000000000000">
          sk_example_••••••••••••00
        </Snippet>
      </DescriptionDetail>
      <DescriptionTerm>Created</DescriptionTerm>
      <DescriptionDetail>12 March 2026</DescriptionDetail>
    </DescriptionList>
  )
}
