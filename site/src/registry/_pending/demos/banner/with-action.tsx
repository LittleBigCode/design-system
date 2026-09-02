import * as React from "react"
import { WarningIcon, XIcon } from "@phosphor-icons/react"

import {
  Banner,
  BannerAction,
  BannerContent,
  BannerDescription,
  BannerTitle,
} from "@diametral/ui/components/banner"
import { Button } from "@diametral/ui/components/button"

export default function BannerWithAction() {
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) {
    return (
      <Button variant="outline" size="sm" onClick={() => setDismissed(false)}>
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
        <Button size="sm" variant="outline">
          Add payment method
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
        >
          <XIcon />
        </Button>
      </BannerAction>
    </Banner>
  )
}
