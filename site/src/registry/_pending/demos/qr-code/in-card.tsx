import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"
import { QrCode } from "@diametral/ui/components/qr-code"
import { Snippet } from "@diametral/ui/components/snippet"

const SECRET = "JBSWY3DPEHPK3PXP"

export default function QrCodeInCard() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Two-factor authentication</CardTitle>
        <CardDescription>
          Scan the code with your authenticator app, or enter the key by hand.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <QrCode
          value={`otpauth://totp/Diametral?secret=${SECRET}&issuer=Diametral`}
          size={160}
        />
        <Snippet value={SECRET} />
      </CardContent>
    </Card>
  )
}
