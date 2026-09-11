import * as React from "react"

import {
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  TagsInput,
} from "@diametral/design-system/react"

export default function TagsInputControlled() {
  const [topics, setTopics] = React.useState<string[]>([
    "accessibility",
    "tokens",
  ])

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field>
        <FieldLabel id="tags-input-controlled-topics-label">Topics</FieldLabel>
        <TagsInput
          value={topics}
          onValueChange={setTopics}
          placeholder="Add a topic…"
          aria-labelledby="tags-input-controlled-topics-label"
        />
        <FieldDescription>
          Submitted as {JSON.stringify(topics)}.
        </FieldDescription>
      </Field>
      <Button
        size="sm"
        variant="outline"
        className="self-start"
        disabled={topics.length === 0}
        onClick={() => setTopics([])}
      >
        Clear all
      </Button>
    </div>
  )
}
