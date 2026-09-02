import { Card, QrCode, Snippet } from "@diametral/design-system/react"

const SECRET = "JBSWY3DPEHPK3PXP"

export default function QrCodeInCard() {
  return (
    <Card className="w-full max-w-xs" title="Two-factor authentication">
      <p className="text-muted-foreground text-sm">
        Scan the code with your authenticator app, or enter the key by hand.
      </p>
      <div className="mt-4 flex flex-col items-center gap-4">
        <QrCode
          value={`otpauth://totp/Diametral?secret=${SECRET}&issuer=Diametral`}
          size={160}
        />
        <Snippet value={SECRET} />
      </div>
    </Card>
  )
}
