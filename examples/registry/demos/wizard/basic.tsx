import { Wizard } from "@diametral/design-system/react"

const STEPS = [
  { label: "Source", content: <p>Where the rows come from.</p> },
  { label: "Mapping", content: <p>Which source column feeds which field.</p> },
  { label: "Schedule", content: <p>How often the pipeline runs.</p> },
  {
    label: "Review",
    content: <p>Everything above, once more, before it runs.</p>,
  },
]

export default function WizardBasic() {
  return <Wizard steps={STEPS} defaultActive={1} />
}
