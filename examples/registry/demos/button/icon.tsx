import { PaperPlaneTiltIcon } from "@phosphor-icons/react"
import { Button, Spinner } from "@diametral/design-system/react"

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <PaperPlaneTiltIcon /> Send
      </Button>
      <Button variant="outline">
        <Spinner /> Loading
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}
