import { Button } from "@diametral/ui/components/button"
import { ButtonGroup } from "@diametral/ui/components/button-group"

export default function ButtonGroupBasic() {
  return (
    <ButtonGroup>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  )
}
