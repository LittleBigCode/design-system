import { Treemap } from "@diametral/ui/components/treemap"

const DATA = [
  { name: "Compute", value: 18400 },
  { name: "Object storage", value: 9200 },
  { name: "Managed Postgres", value: 7650 },
  { name: "Egress", value: 5100 },
  { name: "Kubernetes", value: 4300 },
  { name: "Redis", value: 2800 },
  { name: "Load balancers", value: 2150 },
  { name: "Secrets", value: 1400 },
  { name: "Logging", value: 1250 },
  { name: "Backups", value: 900 },
]

export default function TreemapSpend() {
  return (
    <Treemap
      data={DATA}
      formatValue={(value) => `€${(value / 1000).toFixed(1)}k`}
      className="h-72"
    />
  )
}
