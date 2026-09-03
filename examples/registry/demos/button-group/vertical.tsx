import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
} from "@diametral/design-system/react"
export default function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical">
      <Button>Export as CSV</Button>
      <Button>Export as JSON</Button>
      <ButtonGroupSeparator orientation="horizontal" />
      <Button>Copy to clipboard</Button>
    </ButtonGroup>
  )
}
