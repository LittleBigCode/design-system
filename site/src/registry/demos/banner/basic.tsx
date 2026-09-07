import {
  Banner,
  BannerContent,
  BannerDescription,
  BannerTitle,
} from "@diametral/design-system/react"
import { InfoIcon } from "@phosphor-icons/react"

export default function BannerBasic() {
  return (
    <Banner tone="info">
      <InfoIcon />
      <BannerContent>
        <BannerTitle>Scheduled maintenance</BannerTitle>
        <BannerDescription>
          The staging environment is unavailable from 10pm to midnight UTC.
        </BannerDescription>
      </BannerContent>
    </Banner>
  )
}
