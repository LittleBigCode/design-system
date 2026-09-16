"use client"

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldLabel,
  FieldSeparator,
  Input,
  Wordmark,
} from "@diametral/design-system/react"

/** The whole screen, not a section of one: the card is centred on the brand
 *  background and the page has no chrome around it. */
export default function Login02() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-6">
      <Card className="w-full max-w-95">
        <CardHeader className="flex flex-col items-center gap-3.5">
          <Wordmark variant="square" className="size-10" />
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <Field>
              <FieldLabel htmlFor="login-02-email">Email</FieldLabel>
              <Input
                id="login-02-email"
                type="email"
                autoComplete="email"
                placeholder="you@diametral.io"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="login-02-password">Password</FieldLabel>
              <Input
                id="login-02-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
              />
            </Field>
            <Button type="submit" variant="primary" block>
              Sign in
            </Button>
            <FieldDescription className="text-end">
              <a href="#login-02">Forgot your password?</a>
            </FieldDescription>
            <FieldSeparator>or</FieldSeparator>
            <Button type="button" block>
              Continue with SSO
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
