import { Treemap } from "@diametral/ui/components/treemap"

const DATA = [
  { name: "France", value: 4820 },
  { name: "Germany", value: 3140 },
  { name: "Spain", value: 1960 },
  { name: "Italy", value: 1740 },
  { name: "Netherlands", value: 1180 },
  { name: "Belgium", value: 860 },
  { name: "Portugal", value: 640 },
  { name: "Austria", value: 520 },
  { name: "Denmark", value: 410 },
  { name: "Sweden", value: 380 },
  { name: "Finland", value: 290 },
  { name: "Ireland", value: 250 },
  { name: "Poland", value: 230 },
  { name: "Czechia", value: 180 },
  { name: "Greece", value: 150 },
  { name: "Hungary", value: 120 },
  { name: "Slovakia", value: 90 },
  { name: "Estonia", value: 60 },
]

export default function TreemapSmallTiles() {
  return <Treemap data={DATA} className="h-56" />
}
