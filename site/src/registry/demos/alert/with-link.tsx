import { InfoIcon } from "@phosphor-icons/react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@diametral/design-system/react"

export default function AlertWithLink() {
  return (
    <Alert className="w-full max-w-xl">
      <InfoIcon />
      <AlertTitle>Scheduled maintenance on 9 August</AlertTitle>
      <AlertDescription>
        Exports are queued between 02:00 and 04:00 CEST. Progress is posted on{" "}
        <a href="#status">the status page</a>, and queued jobs run as soon as
        the window closes.
      </AlertDescription>
    </Alert>
  )
}
