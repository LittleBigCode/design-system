import type { ComponentProps } from "react"
import { InfoIcon } from "@phosphor-icons/react"

import {
  Banner,
  BannerAction,
  BannerContent,
  BannerDescription,
  BannerTitle,
} from "@diametral/ui/components/banner"
import { Button } from "@diametral/ui/components/button"

// Renders every Banner part — the code strip doubles as the anatomy
// navigator, so a part missing here would not be selectable.
export default function BannerPlayground({
  children,
  description = "The staging environment is unavailable from 10pm to midnight UTC.",
  action = "View status",
  ...props
}: ComponentProps<typeof Banner> & {
  description?: string
  action?: string
}) {
  return (
    <Banner {...props} className="w-full">
      <InfoIcon />
      <BannerContent>
        <BannerTitle>{children}</BannerTitle>
        <BannerDescription>{description}</BannerDescription>
      </BannerContent>
      <BannerAction>
        <Button size="sm" variant="outline">
          {action}
        </Button>
      </BannerAction>
    </Banner>
  )
}
