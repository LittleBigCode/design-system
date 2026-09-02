import { GearIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Settings">
        <GearIcon />
      </Button>
    </div>
  )
}
