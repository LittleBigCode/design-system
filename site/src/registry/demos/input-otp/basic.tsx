import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@diametral/design-system/react"

export default function InputOtpBasic() {
  return (
    <InputOTP maxLength={6} aria-label="One-time code">
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}
