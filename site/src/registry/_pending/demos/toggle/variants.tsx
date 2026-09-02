import { Toggle } from "@diametral/ui/components/toggle"

export default function ToggleVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle defaultPressed>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="outline" size="sm">
        Small
      </Toggle>
      <Toggle variant="outline" size="lg">
        Large
      </Toggle>
      <Toggle variant="outline" disabled>
        Disabled
      </Toggle>
    </div>
  )
}
