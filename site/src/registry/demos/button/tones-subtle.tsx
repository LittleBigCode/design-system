import { Button } from "@diametral/design-system/react"
export default function ButtonTonesSubtle() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" tone="red">
        Outline red
      </Button>
      <Button variant="outline" tone="blue">
        Outline blue
      </Button>
      <Button variant="ghost" tone="green">
        Ghost vert
      </Button>
      <Button variant="ghost" tone="brown">
        Ghost brown
      </Button>
    </div>
  )
}
