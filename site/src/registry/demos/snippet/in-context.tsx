import { DescriptionList, Snippet } from "@diametral/design-system/react"

export default function SnippetInContext() {
  return (
    <DescriptionList
      className="w-full max-w-sm"
      items={[
        {
          term: "API key",
          desc: (
            <Snippet value="sk_example_000000000000000000">
              sk_example_••••••••••••00
            </Snippet>
          ),
        },
        { term: "Created", desc: "12 March 2026" },
      ]}
    />
  )
}
