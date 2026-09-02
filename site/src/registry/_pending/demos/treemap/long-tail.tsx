import { Treemap } from "@diametral/ui/components/treemap"

const DATA = [
  { name: "react-dom", value: 132400 },
  { name: "recharts", value: 41200 },
  { name: "date-fns", value: 18600 },
  { name: "@base-ui/react", value: 14300 },
  { name: "clsx", value: 1100 },
  { name: "tailwind-merge", value: 940 },
  { name: "cva", value: 620 },
  { name: "zustand", value: 480 },
]

export default function TreemapLongTail() {
  return (
    <Treemap
      data={DATA}
      formatValue={(value) => `${Math.round(value / 1024)} KB`}
      className="h-72"
    />
  )
}
