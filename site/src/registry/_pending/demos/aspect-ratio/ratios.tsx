import { AspectRatio } from "@diametral/ui/components/aspect-ratio"

const RATIOS = [
  { label: "1 / 1", value: 1 },
  { label: "4 / 3", value: 4 / 3 },
  { label: "16 / 9", value: 16 / 9 },
  { label: "21 / 9", value: 21 / 9 },
]

export default function AspectRatioRatios() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {RATIOS.map((ratio) => (
        <AspectRatio
          key={ratio.label}
          ratio={ratio.value}
          className="border border-border bg-muted/50"
        >
          <div className="flex size-full items-center justify-center font-mono text-xs text-muted-foreground">
            {ratio.label}
          </div>
        </AspectRatio>
      ))}
    </div>
  )
}
