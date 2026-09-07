"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cx } from "../lib/cx.js"
import { MinusIcon } from "@phosphor-icons/react"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cx("cx-input-otp ds-input-otp", containerClassName)}
      spellCheck={false}
      className={cx("ds-input-otp-input", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cx("ds-input-otp-group", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cx("ds-input-otp-slot", className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="ds-input-otp-slot-caret">
          <div className="ds-input-otp-slot-caret-line" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="ds-input-otp-separator"
      role="separator"
      {...props}
    >
      <MinusIcon
      />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }