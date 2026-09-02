import { Heatmap } from "@diametral/ui/components/heatmap"

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const DATA = WEEKDAYS.flatMap((weekday, day) =>
  Array.from({ length: 24 }, (_, hour) => {
    const office = Math.max(0, 1 - Math.abs(hour - 14) / 7)
    const weekend = day > 4 ? 0.18 : 1
    const wobble = 0.75 + Math.abs(Math.sin(day * 3.1 + hour * 0.7)) * 0.5
    return {
      x: String(hour).padStart(2, "0"),
      y: weekday,
      value: Math.round(office * weekend * wobble * 240),
    }
  })
)

export default function HeatmapActivity() {
  return (
    <Heatmap
      data={DATA}
      cellSize={18}
      formatValue={(value) => `${value} sessions`}
    />
  )
}
