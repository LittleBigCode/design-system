import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@diametral/design-system/react"
import {
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react"

export default function ToolbarBasic() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton aria-label="Undo">
          <ArrowUUpLeftIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Redo">
          <ArrowUUpRightIcon />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ToolbarButton aria-label="Align left">
          <TextAlignLeftIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Align center">
          <TextAlignCenterIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Align right">
          <TextAlignRightIcon />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  )
}
