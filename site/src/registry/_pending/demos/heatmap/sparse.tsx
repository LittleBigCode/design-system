import { Heatmap } from "@diametral/ui/components/heatmap"

const DATA = [
  { x: "Mon", y: "checkout", value: 14 },
  { x: "Tue", y: "checkout", value: 9 },
  { x: "Wed", y: "checkout", value: 31 },
  { x: "Thu", y: "checkout", value: 6 },
  { x: "Fri", y: "checkout", value: 22 },
  { x: "Mon", y: "search", value: 3 },
  { x: "Wed", y: "search", value: 0 },
  { x: "Fri", y: "search", value: 11 },
  { x: "Tue", y: "billing", value: 42 },
  { x: "Wed", y: "billing", value: 18 },
  { x: "Thu", y: "billing", value: 7 },
  { x: "Mon", y: "notifier", value: 2 },
  { x: "Fri", y: "notifier", value: 1 },
]

export default function HeatmapSparse() {
  return (
    <Heatmap
      data={DATA}
      cellSize={28}
      emptyLabel="not deployed"
      formatValue={(value) => `${value} errors`}
    />
  )
}
