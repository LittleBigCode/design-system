import { Marker, MarkerContent, Switch } from "@diametral/design-system/react"

const GROUPS = [
  {
    title: "Notifications",
    rows: [
      { id: "marker-email", label: "Email alerts", on: true },
      { id: "marker-digest", label: "Weekly digest", on: false },
    ],
  },
  {
    title: "Privacy",
    rows: [
      { id: "marker-profile", label: "Public profile", on: true },
      { id: "marker-indexing", label: "Search indexing", on: false },
    ],
  },
]

export default function MarkerSectionLabels() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      {GROUPS.map((group) => (
        <section key={group.title} className="flex flex-col gap-4">
          <Marker variant="border">
            <MarkerContent>{group.title}</MarkerContent>
          </Marker>
          {group.rows.map((row) => (
            // Switch carries its own label as children — it renders the
            // <label> wrapper itself, so there is no htmlFor to wire.
            <Switch key={row.id} defaultChecked={row.on}>
              {row.label}
            </Switch>
          ))}
        </section>
      ))}
    </div>
  )
}
