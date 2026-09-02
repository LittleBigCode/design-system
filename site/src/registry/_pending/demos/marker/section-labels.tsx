import { Label } from "@diametral/ui/components/label"
import { Marker, MarkerContent } from "@diametral/ui/components/marker"
import { Switch } from "@diametral/ui/components/switch"

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
            <div key={row.id} className="flex items-center justify-between">
              <Label htmlFor={row.id}>{row.label}</Label>
              <Switch id={row.id} defaultChecked={row.on} />
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
