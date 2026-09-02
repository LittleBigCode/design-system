import { Marker, MarkerContent } from "@diametral/design-system/react"
import { ScrollArea } from "@diametral/design-system/react"

const GROUPS = [
  { label: "Actions", items: ["Button", "Button Group", "Toggle", "Toolbar"] },
  { label: "Forms", items: ["Input", "Select", "Checkbox", "Slider"] },
  { label: "Overlays", items: ["Dialog", "Sheet", "Popover", "Tooltip"] },
]

export default function ScrollAreaWithHeadings() {
  return (
    <ScrollArea className="h-56 w-full max-w-xs border border-border">
      <div className="flex flex-col gap-4 p-4">
        {GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <Marker variant="border">
              <MarkerContent>{group.label}</MarkerContent>
            </Marker>
            {group.items.map((item) => (
              <span key={item} className="text-sm text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
