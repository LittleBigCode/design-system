import type { ComponentProps } from "react"
import { CheckIcon } from "@phosphor-icons/react"

import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@diametral/design-system/react"

export default function MarkerPlayground({
  children,
  ...props
}: ComponentProps<typeof Marker>) {
  return (
    <Marker {...props}>
      <MarkerIcon>
        <CheckIcon />
      </MarkerIcon>
      <MarkerContent>{children}</MarkerContent>
    </Marker>
  )
}
