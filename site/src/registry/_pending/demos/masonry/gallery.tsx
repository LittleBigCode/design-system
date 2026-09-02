import { AspectRatio } from "@diametral/ui/components/aspect-ratio"
import { Masonry } from "@diametral/ui/components/masonry"

const FRAMES = [
  { caption: "Harbour at dusk", ratio: 16 / 9 },
  { caption: "Studio portrait", ratio: 3 / 4 },
  { caption: "Contact sheet", ratio: 1 },
  { caption: "Panorama test", ratio: 21 / 9 },
  { caption: "Print proof", ratio: 4 / 5 },
  { caption: "Location scout", ratio: 4 / 3 },
]

export default function MasonryGallery() {
  return (
    <Masonry columns={2} className="w-full max-w-md">
      {FRAMES.map((frame) => (
        <figure key={frame.caption}>
          <AspectRatio
            ratio={frame.ratio}
            className="border border-border bg-muted/50"
          >
            <div className="flex size-full items-center justify-center font-mono text-xs text-muted-foreground">
              {frame.caption}
            </div>
          </AspectRatio>
        </figure>
      ))}
    </Masonry>
  )
}
