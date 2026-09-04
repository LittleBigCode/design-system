import { VerticalNav } from "@diametral/design-system/react"

const ITEMS = [
  { label: "Overview", href: "#overview", active: true },
  {
    label: "Pipelines",
    href: "#pipelines",
    children: [
      { label: "Runs", href: "#runs" },
      { label: "Schedules", href: "#schedules" },
    ],
  },
  { label: "Datasets", href: "#datasets" },
  {
    label: "Settings",
    href: "#settings",
    children: [
      { label: "Members", href: "#members" },
      { label: "Billing", href: "#billing" },
    ],
  },
]

export default function SidebarBasic() {
  return (
    <div className="w-56">
      <VerticalNav items={ITEMS} />
    </div>
  )
}
