import { Marker, MarkerContent } from "@diametral/ui/components/marker"

const FEED = [
  {
    day: "Yesterday",
    entries: [
      "Camille approved the colour audit",
      "Augustin merged the token rename",
    ],
  },
  {
    day: "Today",
    entries: [
      "Diane commented on the invoice template",
      "Charte graphique 2026 was signed",
    ],
  },
]

export default function MarkerDayDivider() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      {FEED.map((group) => (
        <div key={group.day} className="flex flex-col gap-3">
          <Marker variant="separator">
            <MarkerContent>{group.day}</MarkerContent>
          </Marker>
          {group.entries.map((entry) => (
            <p key={entry} className="text-sm text-muted-foreground">
              {entry}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}
