import { AspectRatio } from "@diametral/ui/components/aspect-ratio"

export default function AspectRatioBasic() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <div className="flex size-full items-center justify-center font-mono text-xs text-muted-foreground">
          16 / 9
        </div>
      </AspectRatio>
    </div>
  )
}
