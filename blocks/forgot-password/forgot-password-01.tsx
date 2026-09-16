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
  Input,
} from "@diametral/design-system/react"

export default function ForgotPassword01() {
  return (
    <div className="mx-auto w-full max-w-90 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>
            Enter your email and we'll send a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="forgot-password-01-email">Email</FieldLabel>
            <Input
              id="forgot-password-01-email"
              type="email"
              autoComplete="email"
              placeholder="you@diametral.io"
            />
          </Field>
          <Button variant="primary" block>
            Send reset link
          </Button>
          <FieldDescription className="text-center">
            <a href="#forgot-password-01">Back to sign in</a>
          </FieldDescription>
        </CardContent>
      </Card>
    </div>
  )
}
