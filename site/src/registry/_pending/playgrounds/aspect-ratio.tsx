import { AspectRatio } from "@diametral/ui/components/aspect-ratio"

// `ratio` is required and non-integer, which is why the config marks it `always`
// (so it is never omitted from the snippet) and why serialize prints decimals
// unquoted — `ratio="1.7778"` would not compile against `ratio: number`.
export default function AspectRatioPlayground({
  ratio = "1.7778",
  ...rest
}: {
  ratio?: string
  className?: string
}) {
  const props = { ...rest, ratio: Number(ratio) }

  return (
    <div className="w-full max-w-3xs">
      <AspectRatio {...props} className="border border-border bg-muted/50">
        <div className="flex size-full items-center justify-center font-mono text-xs text-muted-foreground">
          {ratio}
        </div>
      </AspectRatio>
    </div>
  )
}
