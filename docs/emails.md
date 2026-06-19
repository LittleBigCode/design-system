# Emails

On-brand **transactional emails** for the messages your apps send (welcome,
password reset, verification codes, notifications, invoices…).

Email is its own medium: clients strip `<link>`/`<style>`, ignore flexbox & grid,
and won't load Geist/Ufficio. So the `.ds-*` stylesheet can't be used here.
Instead, the kit ships **email-safe** builders that translate the brand into
table layout + inline styles + system-font fallbacks, keeping it flat, 1px and
no-radius. It lives in [`emails/`](../emails/diametral-email.js), is a plain,
dependency-free ES module, and ships TypeScript types.

## Use it

Import the builders server-side and hand the HTML string to any mailer:

```js
import { welcomeEmail } from "@diametral/design-system/emails";

await mailer.send({
  to: user.email,
  subject: "Welcome to the Console",
  html: welcomeEmail({ name: user.firstName, ctaUrl: "https://app.example.com/start" }),
});
```

Works with nodemailer, SES, SendGrid, Postmark, Resend — they all take an `html`
string. Subject lines are yours to set; the `preheader` option fills the inbox
preview text.

## Ready-made templates

| Function | For |
|---|---|
| `welcomeEmail({ name, product, ctaUrl, ctaLabel })` | onboarding / verify |
| `passwordResetEmail({ name, resetUrl, expiresMin })` | password reset |
| `otpEmail({ code, expiresMin })` | one-time codes / 2FA |
| `notificationEmail({ title, message, sub, ctaUrl, ctaLabel })` | generic alerts |
| `invoiceEmail({ number, items, total, dueDate, payUrl })` | billing / receipts |

Each returns a complete HTML document.

## Compose your own

Build any email from the shared `layout()` plus the block helpers — `kicker`,
`heading`, `paragraph`, `muted`, `button(label, href, { variant })`, `divider`,
`codeBox`, and `row(label, amount, { strong })` for line items:

```js
import { layout, kicker, heading, paragraph, button } from "@diametral/design-system/emails";

const html = layout({
  sub: "Account",
  preheader: "Your trial is ending",
  body:
    kicker("Heads-up") +
    heading("Your trial ends in 3 days") +
    paragraph("Upgrade to keep your projects and team.") +
    button("Upgrade", "https://app.example.com/billing"),
});
```

The brand values (`brand.ink`, `brand.accent`, `brand.sans`, `brand.serif`, …)
are exported too, so custom markup can stay consistent.

## What it maps to

- **Layout** — a 600px centered table on a light page background; a white card
  with a 1px border; a header with the **Diametral** wordmark over a 1px rule; a
  faint footer. No border-radius, no shadows.
- **Type** — headings use a serif stack (Georgia → echoes Ufficio/Fraunces);
  body uses the system sans stack. Brand fonts don't load in mail.
- **Color** — ink `#161616`, accent `#ff2a00` (text uses the darker `#db2400`
  for contrast), 1px rules `#e5e5e5`.
- **Buttons** — bulletproof table-cell buttons; `primary` is solid black, `ghost`
  is outlined. Flat, no radius.

## Caveats & testing

- **Images are blocked by default** in most clients, so the kit is text + CSS
  only (the wordmark is live text, not an image). Add images only with good
  `alt` text and absolute URLs.
- **Dark mode**: some clients auto-invert. The layout sets `color-scheme: light`;
  test in the clients you care about.
- **Preview** the templates live in the showcase:
  [`examples/components/email.html`](../examples/components/email.html), or render
  a builder to a string and open it in a browser. Test real delivery with a tool
  like Litmus / Email on Acid before shipping high-volume mail.
