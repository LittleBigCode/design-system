import { Tabs } from "@diametral/design-system/react"

const PANELS = [
  {
    id: "schema",
    label: "Schema",
    sublabel: "14 columns",
    content: <p>Column types, nullability and the primary key.</p>,
  },
  {
    id: "preview",
    label: "Preview",
    sublabel: "100 rows",
    content: <p>The first hundred rows, sampled at read time.</p>,
  },
  {
    id: "lineage",
    label: "Lineage",
    content: <p>Which pipelines write here, and what reads it downstream.</p>,
  },
]

export default function TabsBasic() {
  return <Tabs items={PANELS} defaultValue="schema" className="w-full" />
}
