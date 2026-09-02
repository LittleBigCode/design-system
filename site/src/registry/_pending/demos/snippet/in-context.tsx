import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@diametral/ui/components/description-list"
import { Snippet } from "@diametral/ui/components/snippet"

export default function SnippetInContext() {
  return (
    <DescriptionList className="w-full max-w-sm">
      <DescriptionTerm>API key</DescriptionTerm>
      <DescriptionDetail>
        <Snippet value="sk_example_000000000000000000">
          sk_example_••••••••••••00
        </Snippet>
      </DescriptionDetail>
    </DescriptionList>
  )
}
