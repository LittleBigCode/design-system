import { Rating } from "@diametral/design-system/react"

export default function RatingShapes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm">Rectangles</span>
        <Rating defaultValue={4} aria-label="Rectangles" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm">Stars</span>
        <Rating shape="star" defaultValue={4} aria-label="Stars" />
      </div>
    </div>
  )
}
