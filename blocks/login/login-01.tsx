import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Wordmark,
} from "@diametral/design-system/react"

export default function Login01() {
  return (
    <div className="mx-auto w-full max-w-90 p-6">
      <Card>
        <CardHeader className="flex flex-col items-center gap-3.5">
          <Wordmark variant="square" className="size-10" />
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="login-01-email">Email</FieldLabel>
            <Input
              id="login-01-email"
              type="email"
              autoComplete="email"
              placeholder="you@diametral.io"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="login-01-password">Password</FieldLabel>
            <Input
              id="login-01-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </Field>
          <Button variant="primary" block>
            Sign in
          </Button>
          <Button block>Continue with SSO</Button>
          <FieldDescription className="text-end">
            <a href="#login-01">Forgot your password?</a>
          </FieldDescription>
        </CardContent>
      </Card>
    </div>
  )
}
