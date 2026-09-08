import { Example, P } from "@/docs/foundation-example"

export function Login() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Templates
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Login
        </h1>
        <p className={`mt-3 ${P}`}>
          A standalone sign-in page: the wordmark, a form, and an SSO
          fallback, centered on the brand background.
        </p>
      </header>

      <Example
        label="Sign in"
        code={
          '<div class="ds-card" style="max-width:380px">\n  <div style="display:flex;flex-direction:column;align-items:center;gap:18px;padding:32px 28px 8px">\n    <span class="ds-wordmark">…</span>\n    <h1 style="font-family:var(--ds-font-title)">Sign in</h1>\n  </div>\n  <form style="display:flex;flex-direction:column;gap:16px;padding:0 28px 28px">\n    <div class="ds-field"><label for="email">Email</label><input class="ds-input" id="email" type="email" required></div>\n    <div class="ds-field"><label for="password">Password</label><input class="ds-input" id="password" type="password" required></div>\n    <button class="ds-button ds-button--block ds-button--primary" type="submit">Sign in</button>\n    <div style="display:flex;justify-content:flex-end"><a href="#">Forgot password?</a></div>\n    <div class="ds-section-heading">or</div>\n    <button class="ds-button ds-button--block" type="button">Continue with SSO</button>\n  </form>\n</div>'
        }
      >
        <div
          className="flex min-h-96 w-full items-center justify-center border border-border p-8"
          style={{ background: "var(--ds-bg)" }}
        >
          <div className="ds-card w-full max-w-[380px]">
            <div className="flex flex-col items-center gap-4.5 px-7 pt-8 pb-2">
              <span className="ds-wordmark">
                <svg
                  className="ds-wordmark__mark"
                  viewBox="0 0 56 56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <circle cx={28} cy={28} r={24} />
                  <rect x={12} y={12} width={32} height={32} />
                  <line x1={12} y1={44} x2={44} y2={12} />
                </svg>
                <span className="ds-wordmark__name">Diametral</span>
              </span>
              <h1
                className="mt-2 text-center"
                style={{ fontFamily: "var(--ds-font-title)", fontSize: 22 }}
              >
                Sign in
              </h1>
            </div>

            <form
              className="flex flex-col gap-4 px-7 pt-0 pb-7"
              action="#"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="ds-field">
                <label htmlFor="tpl-email">Email</label>
                <input
                  className="ds-input"
                  id="tpl-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@diametral.io"
                  required
                />
              </div>
              <div className="ds-field">
                <label htmlFor="tpl-password">Password</label>
                <input
                  className="ds-input"
                  id="tpl-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                className="ds-button ds-button--block ds-button--primary"
                type="submit"
              >
                Sign in
              </button>
              <div className="flex justify-end">
                <a href="#" className="text-xs text-muted-foreground">
                  Forgot password?
                </a>
              </div>
              <div className="ds-section-heading my-1">or</div>
              <button className="ds-button ds-button--block" type="button">
                Continue with SSO
              </button>
            </form>
          </div>
        </div>
      </Example>
    </div>
  )
}
