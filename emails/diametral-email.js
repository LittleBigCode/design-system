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
