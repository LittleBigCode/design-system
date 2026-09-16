"use client"

import * as React from "react"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldLabel,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@diametral/design-system/react"

export default function Otp01() {
  const [code, setCode] = React.useState("")

  return (
    <div className="mx-auto w-full max-w-90 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Verify it's you</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="otp-01-code">Code</FieldLabel>
            <InputOTP
              id="otp-01-code"
              maxLength={6}
              value={code}
              onChange={setCode}
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </Field>
          <Button
            variant="primary"
            block
            disabled={code.length < 6}
          >
            Verify
          </Button>
          <FieldDescription className="text-center">
            <a href="#otp-01">Use a recovery code instead</a>
          </FieldDescription>
        </CardContent>
      </Card>
    </div>
  )
}
