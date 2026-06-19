/* ============================================================================
   Diametral transactional email kit
   ----------------------------------------------------------------------------
   On-brand HTML emails the way email actually works: table-based layout, inline
   styles, system-font fallbacks, flat / 1px / no-radius — because mail clients
   strip <style>/<link>, ignore flexbox & grid, and won't load Geist/Ufficio.

   Pure, dependency-free string builders. Import in any Node backend and hand the
   returned HTML to your mailer (nodemailer / SES / SendGrid / Postmark …):

       import { welcomeEmail } from "@diametral/design-system/emails";
       await mailer.send({ to, subject: "Welcome", html: welcomeEmail({ name, ctaUrl }) });

   Compose your own with `layout()` + the block helpers (button, heading, …).
   ============================================================================ */

/** Brand values translated for email (hex + safe font stacks; no border-radius). */
export const brand = {
  ink: "#161616",
  soft: "#3a3a3c",
  faint: "#6c6f7d",
  rule: "#e5e5e5",
  bg: "#f4f4f5",
  surface: "#ffffff",
  accent: "#ff2a00",
  accentInk: "#db2400", // accent darkened for text/AA contrast on white
  sans: "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  serif: "Georgia,'Times New Roman',serif", // echoes the Ufficio/Fraunces titles
  maxWidth: 600,
};

const esc = (s) => String(s ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---- Block helpers (return HTML strings) --------------------------------- */

/** A bulletproof flat button (table cell, no radius). variant: "primary" | "ghost". */
export function button(label, href, { variant = "primary" } = {}) {
  const primary = variant === "primary";
  const bg = primary ? brand.ink : brand.surface;
  const color = primary ? "#ffffff" : brand.ink;
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 4px;"><tr>
    <td style="background:${bg};border:1px solid ${brand.ink};">
      <a href="${esc(href)}" style="display:inline-block;padding:12px 22px;font-family:${brand.sans};font-size:15px;line-height:1;color:${color};text-decoration:none;">${esc(label)}</a>
    </td></tr></table>`;
}

export function kicker(text) {
  return `<p style="margin:0 0 10px;font-family:${brand.sans};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.accentInk};">${esc(text)}</p>`;
}

export function heading(text) {
  return `<h1 style="margin:0 0 14px;font-family:${brand.serif};font-weight:400;font-size:26px;line-height:1.2;color:${brand.ink};">${esc(text)}</h1>`;
}

/** Body paragraph. `html` is inserted as-is so you can include <a>/<strong>. */
export function paragraph(html) {
  return `<p style="margin:0 0 16px;font-family:${brand.sans};font-size:15px;line-height:1.6;color:${brand.soft};">${html}</p>`;
}

export function muted(html) {
  return `<p style="margin:0 0 8px;font-family:${brand.sans};font-size:13px;line-height:1.5;color:${brand.faint};">${html}</p>`;
}

export function divider() {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0;"><tr><td style="border-top:1px solid ${brand.rule};font-size:0;line-height:0;height:1px;">&nbsp;</td></tr></table>`;
}

/** A large, letter-spaced one-time code box. */
export function codeBox(code) {
  return `<div style="font-family:'SF Mono',Menlo,Consolas,monospace;font-size:30px;letter-spacing:0.32em;font-weight:600;color:${brand.ink};background:${brand.bg};border:1px solid ${brand.rule};padding:18px 20px;text-align:center;">${esc(code)}</div>`;
}

/** A two-column amount row (e.g. an invoice line). */
export function row(label, amount, { strong = false } = {}) {
  const w = strong ? "600" : "400";
  const top = strong ? `padding:12px 0 0;` : `padding:8px 0;border-bottom:1px solid ${brand.rule};`;
  return `<tr>
    <td style="${top}font-family:${brand.sans};font-size:${strong ? 15 : 14}px;font-weight:${w};color:${brand.ink};">${esc(label)}</td>
    <td align="right" style="${top}font-family:${brand.sans};font-size:${strong ? 15 : 14}px;font-weight:${w};color:${brand.ink};">${esc(amount)}</td></tr>`;
}

const CALLOUT = {
  info: { bd: "#0e6a82", bg: "#eef6f9" },
  success: { bd: "#2e7d4f", bg: "#eef6f0" },
  warning: { bd: "#b8400b", bg: "#fdf3ee" },
  danger: { bd: "#db2400", bg: "#fdeeec" },
};
/** A status banner with a colored left rule. type: info | success | warning | danger. */
export function callout(html, { type = "info" } = {}) {
  const c = CALLOUT[type] || CALLOUT.info;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 16px;"><tr>
    <td style="border:1px solid ${brand.rule};border-left:3px solid ${c.bd};background:${c.bg};padding:12px 16px;font-family:${brand.sans};font-size:14px;line-height:1.55;color:${brand.ink};">${html}</td></tr></table>`;
}

/** A bulleted list. `items` are HTML strings. */
export function list(items = []) {
  const li = items.map((it) => `<li style="margin:0 0 6px;">${it}</li>`).join("");
  return `<ul style="margin:0 0 16px;padding-left:20px;font-family:${brand.sans};font-size:15px;line-height:1.6;color:${brand.soft};">${li}</ul>`;
}

/** A row of label/value stats divided by 1px rules (the brand stat band). */
export function statBand(stats = []) {
  const w = stats.length ? Math.floor(100 / stats.length) : 100;
  const cells = stats.map((s, i) => `<td width="${w}%" style="padding:14px 16px;${i ? `border-left:1px solid ${brand.rule};` : ""}vertical-align:top;">
    <div style="font-family:${brand.sans};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.faint};">${esc(s.label)}</div>
    <div style="font-family:${brand.serif};font-size:24px;color:${brand.ink};margin-top:4px;">${esc(s.value)}</div></td>`).join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 16px;border-top:1px solid ${brand.rule};border-bottom:1px solid ${brand.rule};"><tr>${cells}</tr></table>`;
}

/** A pull-quote with a left rule. */
export function quote(text, cite) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 16px;"><tr>
    <td style="border-left:2px solid ${brand.ink};padding:4px 0 4px 16px;font-family:${brand.serif};font-size:17px;font-style:italic;line-height:1.5;color:${brand.ink};">${esc(text)}${cite ? `<div style="font-family:${brand.sans};font-style:normal;font-size:13px;color:${brand.faint};margin-top:8px;">— ${esc(cite)}</div>` : ""}</td></tr></table>`;
}

/** A bordered inner panel, with an optional uppercase title. */
export function card(html, { title } = {}) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 16px;border:1px solid ${brand.rule};"><tr>
    <td style="padding:16px 18px;">${title ? `<div style="font-family:${brand.sans};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.faint};margin-bottom:10px;">${esc(title)}</div>` : ""}${html}</td></tr></table>`;
}

/* ---- Layout -------------------------------------------------------------- */

function defaultFooter() {
  return `You're receiving this because you have a Diametral account.<br>Diametral · <a href="#" style="color:${brand.faint};">Manage preferences</a>`;
}

/** The shared shell: brand header + body + footer on a light page background.
    Pass `body` (HTML built from the helpers), a `sub` header tag, a hidden
    `preheader` (inbox preview text), and optional `footer` HTML. */
export function layout({ title = "Diametral", sub = "", preheader = "", body = "", footer } = {}) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${brand.bg};-webkit-text-size-adjust:100%;">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(preheader)}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.bg};"><tr>
<td align="center" style="padding:28px 12px;">
  <table role="presentation" width="${brand.maxWidth}" cellpadding="0" cellspacing="0" style="max-width:${brand.maxWidth}px;width:100%;background:${brand.surface};border:1px solid ${brand.rule};">
    <tr><td style="padding:20px 28px;border-bottom:1px solid ${brand.ink};">
      <span style="font-family:${brand.serif};font-size:20px;color:${brand.ink};">Diametral</span>${sub ? `<span style="font-family:${brand.sans};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${brand.faint};">&nbsp;&nbsp;${esc(sub)}</span>` : ""}
    </td></tr>
    <tr><td style="padding:28px;">${body}</td></tr>
    <tr><td style="padding:18px 28px;border-top:1px solid ${brand.rule};font-family:${brand.sans};font-size:12px;line-height:1.5;color:${brand.faint};">${footer ?? defaultFooter()}</td></tr>
  </table>
  <div style="font-family:${brand.sans};font-size:11px;letter-spacing:0.04em;color:${brand.faint};padding:14px 0 0;">Diametral — Welcome to (the real)</div>
</td></tr></table>
</body></html>`;
}

/* ---- Ready-made templates ------------------------------------------------ */

export function welcomeEmail({ name = "there", product = "the Console", ctaUrl = "#", ctaLabel = "Get started" } = {}) {
  return layout({
    title: "Welcome", sub: "Account", preheader: `Welcome to ${product}`,
    body: kicker("Welcome")
      + heading(`Welcome, ${esc(name)}.`)
      + paragraph(`Your account is ready. ${esc(product)} is where you'll manage your work — jump in whenever you're ready.`)
      + button(ctaLabel, ctaUrl)
      + muted(`Need a hand? Just reply to this email.`),
  });
}

export function passwordResetEmail({ name = "there", resetUrl = "#", expiresMin = 30 } = {}) {
  return layout({
    title: "Reset your password", sub: "Security", preheader: "Reset your password",
    body: heading("Reset your password")
      + paragraph(`Hi ${esc(name)}, we received a request to reset your password. The link below expires in ${expiresMin} minutes.`)
      + button("Reset password", resetUrl)
      + muted(`If you didn't request this, you can safely ignore this email — your password won't change.`),
  });
}

export function otpEmail({ code = "000000", expiresMin = 10 } = {}) {
  return layout({
    title: "Your verification code", sub: "Security", preheader: `Your code: ${code}`,
    body: heading("Your verification code")
      + paragraph(`Enter this code to continue. It expires in ${expiresMin} minutes.`)
      + codeBox(code)
      + muted(`Didn't try to sign in? You can ignore this email.`),
  });
}

export function notificationEmail({ title = "Notification", message = "", sub = "Notification", ctaUrl, ctaLabel = "Open" } = {}) {
  return layout({
    title, sub, preheader: title,
    body: heading(title)
      + paragraph(message)
      + (ctaUrl ? button(ctaLabel, ctaUrl) : ""),
  });
}

export function invoiceEmail({ number = "INV-0000", items = [], total = "€0", dueDate, payUrl } = {}) {
  const lines = items.map((it) => row(it.label, it.amount)).join("");
  return layout({
    title: `Invoice ${number}`, sub: "Billing", preheader: `Invoice ${number} — ${total}`,
    body: kicker("Invoice")
      + heading(`Invoice ${esc(number)}`)
      + (dueDate ? muted(`Due ${esc(dueDate)}.`) : "")
      + `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0 18px;">${lines}${row("Total", total, { strong: true })}</table>`
      + (payUrl ? button("Pay invoice", payUrl) : ""),
  });
}

export function inviteEmail({ inviter = "A teammate", team = "the team", role = "member", acceptUrl = "#" } = {}) {
  return layout({
    title: "You're invited", sub: "Invitation", preheader: `${inviter} invited you to ${team}`,
    body: kicker("Invitation")
      + heading(`Join ${esc(team)} on Diametral`)
      + paragraph(`<strong>${esc(inviter)}</strong> invited you to join <strong>${esc(team)}</strong> as ${esc(role)}.`)
      + button("Accept invitation", acceptUrl)
      + muted("This invitation expires in 7 days."),
  });
}

export function digestEmail({ name = "there", period = "this week", stats = [], items = [], ctaUrl = "#" } = {}) {
  return layout({
    title: "Your digest", sub: "Digest", preheader: `Your summary for ${period}`,
    body: kicker("Digest")
      + heading(`Your ${esc(period)} in review`)
      + paragraph(`Hi ${esc(name)}, here's what moved ${esc(period)}.`)
      + (stats.length ? statBand(stats) : "")
      + (items.length ? card(list(items.map((it) => `<strong>${esc(it.title)}</strong>${it.meta ? ` — <span style="color:${brand.faint}">${esc(it.meta)}</span>` : ""}`)), { title: "Highlights" }) : "")
      + button("Open the Console", ctaUrl),
  });
}

export function alertEmail({ title = "Alert", message = "", level = "warning", sub = "Alert", ctaUrl, ctaLabel = "Investigate" } = {}) {
  return layout({
    title, sub, preheader: title,
    body: heading(title)
      + callout(esc(message), { type: level })
      + (ctaUrl ? button(ctaLabel, ctaUrl) : ""),
  });
}

/** A reference email exercising every block — the email "kitchen sink". */
export function kitchenSinkEmail() {
  return layout({
    title: "All the blocks", sub: "Reference", preheader: "Every email block in one message",
    body: kicker("Reference")
      + heading("Every block, one email")
      + paragraph(`A paragraph with a <a href="#" style="color:${brand.accentInk};text-decoration:underline;">link</a> and <strong>strong</strong> text.`)
      + button("Primary action", "#")
      + button("Secondary", "#", { variant: "ghost" })
      + divider()
      + callout("An informational note.", { type: "info" })
      + callout("Something succeeded.", { type: "success" })
      + callout("Heads-up — check this.", { type: "warning" })
      + callout("Something needs attention.", { type: "danger" })
      + statBand([{ label: "Revenue", value: "€4.5M" }, { label: "Margin", value: "24.6%" }, { label: "Projects", value: "86" }])
      + card(list(["First highlight item", "Second highlight item", "Third highlight item"]), { title: "A list inside a card" })
      + quote("Welcome to (the real).", "Diametral")
      + heading("A verification code")
      + codeBox("418 207")
      + heading("An itemized total")
      + `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 16px;">${row("AI-native delivery", "€18,000")}${row("Retainer", "€6,500")}${row("Total", "€24,500", { strong: true })}</table>`
      + muted("And a muted footnote at the end."),
  });
}
