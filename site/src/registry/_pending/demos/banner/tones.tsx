import type { ComponentProps } from "react"
import {
  CheckCircleIcon,
  InfoIcon,
  MegaphoneIcon,
  SealWarningIcon,
  WarningIcon,
  WarningOctagonIcon,
} from "@phosphor-icons/react"

import {
  Banner,
  BannerContent,
  BannerTitle,
} from "@diametral/ui/components/banner"

const NOTICES: {
  tone: ComponentProps<typeof Banner>["tone"]
  Icon: typeof InfoIcon
  message: string
}[] = [
  {
    tone: "neutral",
    Icon: MegaphoneIcon,
    message: "Audit log exports are now available on every plan.",
  },
  {
    tone: "info",
    Icon: InfoIcon,
    message: "Scheduled maintenance tonight from 10pm to midnight UTC.",
  },
  {
    tone: "success",
    Icon: CheckCircleIcon,
    message: "Workspace restored from the 14:00 snapshot.",
  },
  { tone: "warning", Icon: WarningIcon, message: "Your trial ends in 3 days." },
  {
    tone: "danger",
    Icon: WarningOctagonIcon,
    message: "Payment failed — invoicing is paused until the card is updated.",
  },
  {
    tone: "critical",
    Icon: SealWarningIcon,
    message: "Data sync halted: storage quota exceeded.",
  },
]

export default function BannerTones() {
  return (
    <div className="flex w-full flex-col gap-2">
      {NOTICES.map(({ tone, Icon, message }) => (
        <Banner key={tone} tone={tone}>
          <Icon />
          <BannerContent>
            <BannerTitle>{message}</BannerTitle>
          </BannerContent>
        </Banner>
      ))}
    </div>
  )
}
