import { Masonry } from "@diametral/ui/components/masonry"

const HEIGHTS = [140, 220, 100, 180, 260, 120, 200, 150]

export default function MasonryBasic() {
  return (
    <Masonry columns={3} className="w-full max-w-md">
      {HEIGHTS.map((height, index) => (
        <div
          key={index}
          className="flex items-center justify-center border border-border bg-muted text-xs text-muted-foreground"
          style={{ height }}
        >
          {index + 1}
        </div>
      ))}
    </Masonry>
  )
}
