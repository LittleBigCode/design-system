import { cx } from "../lib/cx.js";
/* ----------------------------------------------------------------------------
   Code block — a flat .ds-code panel: a head bar (filename + Copy button) over a
   scrolling <pre>. The code is rendered as text content (never as HTML — no
   dangerouslySetInnerHTML), so any < > & in the source is shown verbatim. The
   Copy button writes the code to the clipboard (navigator.clipboard with a
   hidden-textarea fallback) and flashes "Copied" briefly.
   Styling: css/components/code-block.css.
   ---------------------------------------------------------------------------- */
import React from "react";

import type { HTMLAttributes, ReactNode } from "react";

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** The code to display. Rendered as text content — never as HTML. */
  code?: string;
  /** Optional language label (shown when no filename is given; also `data-language`). */
  language?: string;
  /** Optional filename shown on the left of the head bar. */
  filename?: string;
}

const h = React.createElement;

/* Copy `text` to the clipboard, falling back to a temporary <textarea> + execCommand
   when the async Clipboard API is unavailable (older browsers / non-secure contexts). */
function copyText(text: any) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise<void>((resolve, reject) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error("Copy command was rejected"));
    } catch (err) {
      reject(err);
    }
  });
}

export interface CodeBlockCopyButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
  /** The text written to the clipboard. */
  value?: string;
  /** Accessible name while idle. Becomes "Copied" for a beat after a copy. */
  label?: string;
  /** Button contents. Defaults to the word Copy/Copied; pass an icon instead
   *  for an icon-only button, and the accessible name comes from `label`. */
  children?: ReactNode;
}

/* The copy affordance, extracted from CodeBlock so Snippet can compose it
   rather than reimplement the clipboard fallback. Snippet is a light surface,
   so it overrides the dark-panel colours through className — see
   `.ds-snippet-copy-button` in css/components/snippet.css. */
export function CodeBlockCopyButton({
  value = "",
  label = "Copy code",
  className,
  children,
  ...rest
}: CodeBlockCopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<any>(null);

  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const onCopy = () => {
    copyText(value).then(() => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    }).catch(() => { /* swallow — nothing to copy to */ });
  };

  return h("button", {
    type: "button",
    className: cx("ds-button", "ds-button--sm", className),
    ...rest,
    // After `rest`, so a caller cannot pin the name and lose the copied state.
    "aria-label": copied ? "Copied" : label,
    onClick: onCopy,
  }, children ?? (copied ? "Copied" : "Copy"));
}

export function CodeBlock({
  code = "",
  language,
  filename,
  className,
  ...rest
}: CodeBlockProps) {
  return h("div", {
    className: cx("ds-code", className),
    "data-language": language || undefined,
    ...rest,
  },
    h("div", { className: "ds-code__head" },
      h("span", { className: "ds-code__filename" }, filename || language || "Snippet"),
      h(CodeBlockCopyButton, { value: code })
    ),
    // Code as TEXT content — never dangerouslySetInnerHTML. tabIndex makes the
    // scrollable region keyboard-focusable (scrollable-region-focusable).
    h("pre", { className: "ds-code__body", tabIndex: 0 }, h("code", null, code))
  );
}
