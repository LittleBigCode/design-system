import { useState } from "react"

import { Badge, Wizard } from "@diametral/design-system/react"

const STEPS = [
  {
    label: "Upload",
    content: <p className="text-sm">Drop the export file.</p>,
  },
  {
    label: "Map",
    content: <p className="text-sm">Match columns to fields.</p>,
  },
  { label: "Import", content: <p className="text-sm">1 284 rows ready.</p> },
]

export default function WizardControlled() {
  const [active, setActive] = useState(1)
  const [finished, setFinished] = useState(false)

  return (
    <div className="flex max-w-lg flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge>{`Step ${active + 1} of ${STEPS.length}`}</Badge>
        {finished ? <span>Import started.</span> : null}
      </div>
      <Wizard
        steps={STEPS}
        active={active}
        onStepChange={setActive}
        onFinish={() => setFinished(true)}
        finishLabel="Start import"
      />
    </div>
  )
}
