import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@diametral/ui/components/input-otp"

// The props are declared narrowly rather than derived from the component: its
// type is a `render` XOR `children` union, and spreading a derived `Omit<…>`
// through it loses the discrimination. `maxLength` is required and numeric, so it
// is coerced here and declared `always` in the config.
//
// The slots are split across two groups so InputOTPSeparator is part of the
// preview: indexes are absolute across groups, which is why the second half
// counts on from `half` rather than restarting at zero.
export default function InputOtpPlayground({
  maxLength = "6",
  ...rest
}: {
  maxLength?: string
  disabled?: boolean
}) {
  const length = Number(maxLength)
  const half = Math.ceil(length / 2)
  const props = { ...rest, maxLength: length }

  return (
    <InputOTP aria-label="One-time code" {...props}>
      <InputOTPGroup>
        {Array.from({ length: half }, (_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {Array.from({ length: length - half }, (_, index) => (
          <InputOTPSlot key={half + index} index={half + index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}
