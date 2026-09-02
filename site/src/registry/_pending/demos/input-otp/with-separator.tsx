import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@diametral/ui/components/input-otp"

export default function InputOtpWithSeparator() {
  const [value, setValue] = React.useState("")

  return (
    <div className="flex flex-col items-start gap-4">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setValue}
        aria-label="One-time code"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="font-mono text-sm text-muted-foreground">
        {value === "" ? "—" : value}
        {value.length === 6 && " · complete"}
      </p>
    </div>
  )
}
