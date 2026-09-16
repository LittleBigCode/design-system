import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldLabel,
  Input,
  Wordmark,
} from "@diametral/design-system/react"

/* login-03 — split layout: brand panel beside the sign-in form.
   ---------------------------------------------------------------------------
   The layout ships with the file rather than as utility classes: a block is
   copied into a consumer's app, and that app has no Tailwind and no build step
   guaranteed. The `@media` is real, not a wrapper width — `48rem` is where the
   two columns stop fitting a form at a readable measure.

   The brand panel's texture is drawn in CSS. The photographic textures the
   foundations page shows live under `site/src/photography/` and are not part of
   the published package, so a copied block could not reach them. Swap the
   `background-image` below for your own asset if you ship one. */
const css = `
.login-03 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  font-family: var(--ds-font-sans);
  background: var(--ds-bg);
}
.login-03__brand {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--ds-space-5);
  padding: var(--ds-space-8) var(--ds-space-7);
  color: var(--ds-on-accent);
  background-color: var(--ds-accent);
  background-image:
    radial-gradient(120% 90% at 15% 0%, rgba(255, 255, 255, .22), transparent 60%),
    radial-gradient(90% 70% at 95% 100%, rgba(22, 22, 22, .35), transparent 65%),
    repeating-linear-gradient(115deg, rgba(255, 255, 255, .06) 0 2px, transparent 2px 7px);
}
.login-03__mark {
  color: var(--ds-on-accent);
}
.login-03__mark svg {
  height: 32px;
}
.login-03__copy {
  margin: 0;
  max-width: 28ch;
  font-family: var(--ds-font-title);
  font-weight: var(--ds-font-weight-title);
  font-size: var(--ds-text-2xl);
  line-height: var(--ds-leading-tight);
}
.login-03__form {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--ds-space-7) var(--ds-space-5);
}
.login-03__card {
  width: 100%;
  max-width: 360px;
}
.login-03__fields {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-4);
}
.login-03__forgot {
  align-self: flex-end;
  font-size: var(--ds-text-xs);
  color: var(--ds-ink-faint);
}

@media (max-width: 48rem) {
  .login-03 {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  .login-03__brand {
    gap: var(--ds-space-3);
    padding: var(--ds-space-5);
  }
  .login-03__copy {
    font-size: var(--ds-text-md);
  }
  .login-03__form {
    padding: var(--ds-space-6) var(--ds-space-4);
    align-items: flex-start;
  }
}
`

export default function Login03() {
  return (
    <div className="login-03">
      <style>{css}</style>

      <section className="login-03__brand">
        <Wordmark className="login-03__mark" />
        <p className="login-03__copy">
          One account for every Diametral surface.
        </p>
      </section>

      <main className="login-03__form">
        <Card className="login-03__card">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent className="login-03__fields">
            <Field>
              <FieldLabel htmlFor="login-03-email">Email</FieldLabel>
              <Input
                id="login-03-email"
                type="email"
                autoComplete="email"
                placeholder="you@diametral.io"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="login-03-password">Password</FieldLabel>
              <Input
                id="login-03-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </Field>
            <Button variant="primary" block>
              Sign in
            </Button>
            <Button variant="ghost" block>
              Continue with SSO
            </Button>
            <a className="login-03__forgot" href="#">
              Forgot password?
            </a>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
