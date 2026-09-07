import { Rating } from "@diametral/design-system/react"

export default function RatingBasic() {
  return (
    <div className="flex flex-col gap-4">
      <Rating defaultValue={4} />
      <Rating value={3} readOnly />
    </div>
  )
}
