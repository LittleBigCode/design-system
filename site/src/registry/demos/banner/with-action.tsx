import {
  Banner,
  BannerAction,
  BannerContent,
  BannerDescription,
  BannerTitle,
  Button,
  IconButton,
} from "@diametral/design-system/react"
import * as React from "react"
import { WarningIcon, XIcon } from "@phosphor-icons/react"

export default function BannerWithAction() {
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) {
    return (
      <Button size="sm" onClick={() => setDismissed(false)}>
        Show banner again
      </Button>
    )
  }

  return (
    <Banner tone="warning">
      <WarningIcon />
      <BannerContent>
        <BannerTitle>Your trial ends in 3 days</BannerTitle>
        <BannerDescription>
          Add a payment method to keep every workspace active.
        </BannerDescription>
      </BannerContent>
      <BannerAction>
        <Button size="sm">
          Add payment method
        </Button>
        <IconButton
          size="icon-sm"
          label="Dismiss"
          onClick={() => setDismissed(true)}
        >
          <XIcon />
        </IconButton>
      </BannerAction>
    </Banner>
  )
}
