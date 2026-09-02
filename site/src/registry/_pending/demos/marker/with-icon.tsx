import { LockSimpleIcon, SealCheckIcon } from "@phosphor-icons/react"

import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@diametral/ui/components/marker"

export default function MarkerWithIcon() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Marker>
        <MarkerIcon>
          <SealCheckIcon />
        </MarkerIcon>
        <MarkerContent>Verified supplier</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <LockSimpleIcon />
        </MarkerIcon>
        <MarkerContent>Internal — do not distribute</MarkerContent>
      </Marker>
    </div>
  )
}
