import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@diametral/ui/components/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@diametral/ui/components/input-otp"

const EXPECTED = "482913"

export default function InputOtpVerifyForm() {
  const [code, setCode] = React.useState("")
  const [rejected, setRejected] = React.useState(false)

  return (
    <form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        setRejected(code !== EXPECTED)
      }}
    >
      <Field>
        <FieldLabel htmlFor="input-otp-verify">Confirmation code</FieldLabel>
        <InputOTP
          id="input-otp-verify"
          maxLength={6}
          value={code}
          onChange={(next) => {
            setCode(next)
            setRejected(false)
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-invalid={rejected}
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }, (_, index) => (
              <InputOTPSlot key={index} index={index} aria-invalid={rejected} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          Sent to +33 6 12 34 56 78. The code here is 482913.
        </FieldDescription>
        {rejected ? <FieldError>That code has expired.</FieldError> : null}
      </Field>
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={code.length < 6}>
          Verify
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => {
            setCode("")
            setRejected(false)
          }}
        >
          Send a new code
        </Button>
      </div>
    </form>
  )
}
