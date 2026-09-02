import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@diametral/ui/components/input-otp"

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
