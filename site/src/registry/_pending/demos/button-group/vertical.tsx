import { Button } from "@diametral/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@diametral/ui/components/button-group"

export default function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Export as CSV</Button>
      <Button variant="outline">Export as JSON</Button>
      <ButtonGroupSeparator orientation="horizontal" />
      <Button variant="outline">Copy to clipboard</Button>
    </ButtonGroup>
  )
}
