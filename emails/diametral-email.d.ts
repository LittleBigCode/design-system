/** Brand values translated for email (hex + safe font stacks). */
export declare const brand: {
  ink: string; soft: string; faint: string; rule: string; bg: string;
  surface: string; accent: string; accentInk: string; sans: string; serif: string;
  maxWidth: number;
};

export interface ButtonOptions { variant?: "primary" | "ghost"; }
export declare function button(label: string, href: string, options?: ButtonOptions): string;
export declare function kicker(text: string): string;
export declare function heading(text: string): string;
/** `html` is inserted as-is (include your own <a>/<strong>). */
export declare function paragraph(html: string): string;
export declare function muted(html: string): string;
export declare function divider(): string;
export declare function codeBox(code: string): string;
export declare function row(label: string, amount: string, options?: { strong?: boolean }): string;

export interface LayoutOptions {
  title?: string;
  /** Small uppercase tag next to the wordmark (e.g. "Security"). */
  sub?: string;
  /** Hidden inbox-preview text. */
  preheader?: string;
  /** Body HTML, built from the block helpers. */
  body?: string;
  /** Footer HTML; omit for the default. */
  footer?: string;
}
/** The shared email shell (header + body + footer). Returns a full HTML document. */
export declare function layout(options?: LayoutOptions): string;

export declare function welcomeEmail(opts?: { name?: string; product?: string; ctaUrl?: string; ctaLabel?: string }): string;
export declare function passwordResetEmail(opts?: { name?: string; resetUrl?: string; expiresMin?: number }): string;
export declare function otpEmail(opts?: { code?: string; expiresMin?: number }): string;
export declare function notificationEmail(opts?: { title?: string; message?: string; sub?: string; ctaUrl?: string; ctaLabel?: string }): string;
export interface InvoiceLine { label: string; amount: string; }
export declare function invoiceEmail(opts?: { number?: string; items?: InvoiceLine[]; total?: string; dueDate?: string; payUrl?: string }): string;
