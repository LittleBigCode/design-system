import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@diametral/ui/components/input-otp"
import { Spinner } from "@diametral/ui/components/spinner"
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@diametral/ui/components/status"

export default function InputOtpAutoSubmit() {
  const [code, setCode] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "checking" | "confirmed">(
    "idle"
  )

  return (
    <div className="flex flex-col items-start gap-3">
      <InputOTP
        maxLength={4}
        aria-label="Authenticator code"
        value={code}
        onChange={setCode}
        disabled={status !== "idle"}
        onComplete={() => {
          setStatus("checking")
          window.setTimeout(() => setStatus("confirmed"), 1000)
        }}
      >
        <InputOTPGroup>
          {Array.from({ length: 4 }, (_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {status === "idle" ? (
        <p className="text-sm text-muted-foreground">
          Enter the four digits from your authenticator app.
        </p>
      ) : null}
      {status === "checking" ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner />
          Checking the code…
        </p>
      ) : null}
      {status === "confirmed" ? (
        <div className="flex items-center gap-3">
          <Status tone="success">
            <StatusIndicator />
            <StatusLabel>Device trusted</StatusLabel>
          </Status>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setCode("")
              setStatus("idle")
            }}
          >
            Reset
          </Button>
        </div>
      ) : null}
    </div>
  )
}
