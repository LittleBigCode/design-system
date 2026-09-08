import { Example, P, Section } from "@/docs/foundation-example"

export function Auth() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Blocks
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Auth
        </h1>
        <p className={`mt-3 ${P}`}>
          Self-contained authentication cards built only from{" "}
          <code className="font-mono text-xs">ds-card</code>,{" "}
          <code className="font-mono text-xs">ds-field</code>, and{" "}
          <code className="font-mono text-xs">ds-button</code>. Each one is a
          flat <code className="font-mono text-xs">ds-card</code> capped at
          ~360px, with stacked{" "}
          <code className="font-mono text-xs">ds-field</code> inputs and a
          full-width{" "}
          <code className="font-mono text-xs">
            ds-button--block ds-button--primary
          </code>{" "}
          as the commit action. Drop one onto the brand background — flat,
          1px, no radius, no shadow.
        </p>
      </header>

      <Section title="Sign in">
        <p className={P}>
          Email and password, a full-width primary commit, a ghost SSO
          fallback, and a small forgot-password link aligned to the end.
        </p>
        <Example
          label="Sign in"
          code={
            '<div class="ds-card" style="max-width:360px;margin:0 auto">\n  <div class="ds-card__header" style="display:flex;flex-direction:column;align-items:center;gap:14px">\n    <span class="ds-wordmark">\n      <svg class="ds-wordmark__mark" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="28" cy="28" r="24"/><rect x="12" y="12" width="32" height="32"/><line x1="12" y1="44" x2="44" y2="12"/></svg>\n      <span class="ds-wordmark__name">Diametral</span>\n    </span>\n    <h2 class="ds-card__title">Sign in</h2>\n  </div>\n  <div class="ds-card__body" style="display:flex;flex-direction:column;gap:16px">\n    <div class="ds-field">\n      <label for="si-email">Email</label>\n      <input class="ds-input" id="si-email" type="email" autocomplete="email" placeholder="you@diametral.io">\n    </div>\n    <div class="ds-field">\n      <label for="si-pass">Password</label>\n      <input class="ds-input" id="si-pass" type="password" autocomplete="current-password" placeholder="••••••••">\n    </div>\n    <button class="ds-button ds-button--block ds-button--primary" type="button">Sign in</button>\n    <button class="ds-button ds-button--block" type="button">Continue with SSO</button>\n    <div style="display:flex;justify-content:flex-end">\n      <a href="#" class="ds-field__hint">Forgot?</a>\n    </div>\n  </div>\n</div>'
          }
        >
          <div className="ds-card mx-auto max-w-[360px]">
            <div className="ds-card__header flex flex-col items-center gap-3.5">
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
              <h2 className="ds-card__title">Sign in</h2>
            </div>
            <div className="ds-card__body flex flex-col gap-4">
              <div className="ds-field">
                <label htmlFor="si-email">Email</label>
                <input
                  className="ds-input"
                  id="si-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@diametral.io"
                />
              </div>
              <div className="ds-field">
                <label htmlFor="si-pass">Password</label>
                <input
                  className="ds-input"
                  id="si-pass"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              </div>
              <button
                className="ds-button ds-button--block ds-button--primary"
                type="button"
              >
                Sign in
              </button>
              <button className="ds-button ds-button--block" type="button">
                Continue with SSO
              </button>
              <div className="flex justify-end">
                <a href="#" className="ds-field__hint">
                  Forgot?
                </a>
              </div>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Sign up">
        <p className={P}>
          Name, email, and password stacked above a full-width primary{" "}
          <code className="font-mono text-xs">Create account</code>.
        </p>
        <Example
          label="Sign up"
          code={
            '<div class="ds-card" style="max-width:360px;margin:0 auto">\n  <div class="ds-card__header"><h2 class="ds-card__title">Create your account</h2></div>\n  <div class="ds-card__body" style="display:flex;flex-direction:column;gap:16px">\n    <div class="ds-field">\n      <label for="su-name">Name</label>\n      <input class="ds-input" id="su-name" type="text" autocomplete="name" placeholder="Ada Lovelace">\n    </div>\n    <div class="ds-field">\n      <label for="su-email">Email</label>\n      <input class="ds-input" id="su-email" type="email" autocomplete="email" placeholder="you@diametral.io">\n    </div>\n    <div class="ds-field">\n      <label for="su-pass">Password</label>\n      <input class="ds-input" id="su-pass" type="password" autocomplete="new-password" placeholder="••••••••">\n    </div>\n    <button class="ds-button ds-button--block ds-button--primary" type="button">Create account</button>\n  </div>\n</div>'
          }
        >
          <div className="ds-card mx-auto max-w-[360px]">
            <div className="ds-card__header">
              <h2 className="ds-card__title">Create your account</h2>
            </div>
            <div className="ds-card__body flex flex-col gap-4">
              <div className="ds-field">
                <label htmlFor="su-name">Name</label>
                <input
                  className="ds-input"
                  id="su-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                />
              </div>
              <div className="ds-field">
                <label htmlFor="su-email">Email</label>
                <input
                  className="ds-input"
                  id="su-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@diametral.io"
                />
              </div>
              <div className="ds-field">
                <label htmlFor="su-pass">Password</label>
                <input
                  className="ds-input"
                  id="su-pass"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
              </div>
              <button
                className="ds-button ds-button--block ds-button--primary"
                type="button"
              >
                Create account
              </button>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Forgot password">
        <p className={P}>
          A single email field, a full-width{" "}
          <code className="font-mono text-xs">Send reset link</code>, and a
          back link to sign in.
        </p>
        <Example
          label="Forgot password"
          code={
            '<div class="ds-card" style="max-width:360px;margin:0 auto">\n  <div class="ds-card__header"><h2 class="ds-card__title">Reset password</h2></div>\n  <div class="ds-card__body" style="display:flex;flex-direction:column;gap:16px">\n    <p class="ds-field__hint">Enter your email and we\'ll send a reset link.</p>\n    <div class="ds-field">\n      <label for="fp-email">Email</label>\n      <input class="ds-input" id="fp-email" type="email" autocomplete="email" placeholder="you@diametral.io">\n    </div>\n    <button class="ds-button ds-button--block ds-button--primary" type="button">Send reset link</button>\n    <div style="display:flex;justify-content:center">\n      <a href="#" class="ds-field__hint">← Back to sign in</a>\n    </div>\n  </div>\n</div>'
          }
        >
          <div className="ds-card mx-auto max-w-[360px]">
            <div className="ds-card__header">
              <h2 className="ds-card__title">Reset password</h2>
            </div>
            <div className="ds-card__body flex flex-col gap-4">
              <p className="ds-field__hint">
                Enter your email and we'll send a reset link.
              </p>
              <div className="ds-field">
                <label htmlFor="fp-email">Email</label>
                <input
                  className="ds-input"
                  id="fp-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@diametral.io"
                />
              </div>
              <button
                className="ds-button ds-button--block ds-button--primary"
                type="button"
              >
                Send reset link
              </button>
              <div className="flex justify-center">
                <a href="#" className="ds-field__hint">
                  ← Back to sign in
                </a>
              </div>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Two-factor">
        <p className={P}>
          A six-digit code entered across six small{" "}
          <code className="font-mono text-xs">ds-input</code>s in a row,
          above a full-width{" "}
          <code className="font-mono text-xs">Verify</code>.
        </p>
        <Example
          label="Two-factor"
          code={
            '<div class="ds-card" style="max-width:360px;margin:0 auto">\n  <div class="ds-card__header"><h2 class="ds-card__title">Verify it\'s you</h2></div>\n  <div class="ds-card__body" style="display:flex;flex-direction:column;gap:16px">\n    <p class="ds-field__hint">Enter the 6-digit code from your authenticator app.</p>\n    <div class="ds-field">\n      <label>Code</label>\n      <div style="display:flex;gap:8px">\n        <input class="ds-input" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 1" style="width:100%;text-align:center;padding-left:0;padding-right:0">\n        <!-- …5 more digits… -->\n      </div>\n    </div>\n    <button class="ds-button ds-button--block ds-button--primary" type="button">Verify</button>\n  </div>\n</div>'
          }
        >
          <div className="ds-card mx-auto max-w-[360px]">
            <div className="ds-card__header">
              <h2 className="ds-card__title">Verify it's you</h2>
            </div>
            <div className="ds-card__body flex flex-col gap-4">
              <p className="ds-field__hint">
                Enter the 6-digit code from your authenticator app.
              </p>
              <div className="ds-field">
                <label>Code</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((digit) => (
                    <input
                      key={digit}
                      className="ds-input px-0 text-center"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`Digit ${digit}`}
                    />
                  ))}
                </div>
              </div>
              <button
                className="ds-button ds-button--block ds-button--primary"
                type="button"
              >
                Verify
              </button>
            </div>
          </div>
        </Example>
      </Section>
    </div>
  )
}
