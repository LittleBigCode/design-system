import {
  Button,
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@diametral/design-system/react"
import * as React from "react"

export default function ProgressIndeterminate() {
  const [value, setValue] = React.useState<number | null>(null)

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value}>
        <ProgressLabel>Indexing</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Button
        size="sm"
        className="self-start"
        onClick={() => setValue((current) => (current === null ? 64 : null))}
      >
        {value === null ? "Resolve to 64%" : "Back to indeterminate"}
      </Button>
    </div>
  )
}
