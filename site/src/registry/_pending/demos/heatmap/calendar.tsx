import { Heatmap } from "@diametral/ui/components/heatmap"

const START = Date.UTC(2025, 7, 4, 12)
const DAY_MS = 86_400_000

const DATA = Array.from({ length: 364 }, (_, i) => {
  const stamp = START + i * DAY_MS
  const weekday = new Date(stamp).getUTCDay()
  const weekend = weekday === 0 || weekday === 6 ? 0.15 : 1
  const wobble = Math.abs(Math.sin(i * 0.41) + Math.cos(i * 0.13))
  return {
    date: new Date(stamp).toISOString().slice(0, 10),
    value: Math.round(weekend * wobble * 9),
  }
})

export default function HeatmapCalendar() {
  return (
    <Heatmap
      layout="calendar"
      data={DATA}
      cellSize={12}
      formatValue={(value) => `${value} commits`}
    />
  )
}
