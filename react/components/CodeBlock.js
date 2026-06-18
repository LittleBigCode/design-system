/* ----------------------------------------------------------------------------
   Code block — a flat .ds-code panel: a head bar (filename + Copy button) over a
   scrolling <pre>. The code is rendered as text content (never as HTML — no
   dangerouslySetInnerHTML), so any < > & in the source is shown verbatim. The
   Copy button writes the code to the clipboard (navigator.clipboard with a
   hidden-textarea fallback) and flashes "Copied" briefly.
   Styling: css/components/code-block.css.
   ---------------------------------------------------------------------------- */
import React from "react";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* Copy `text` to the clipboard, falling back to a temporary <textarea> + execCommand
   when the async Clipboard API is unavailable (older browsers / non-secure contexts). */
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
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

export function CodeBlock({
  code = "",
  language,
  filename,
  className,
  ...rest
}) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef(null);

  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const onCopy = () => {
    copyText(code).then(() => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    }).catch(() => { /* swallow — nothing to copy to */ });
  };

  return h("div", {
    className: cx("ds-code", className),
    "data-language": language || undefined,
    ...rest,
  },
    h("div", { className: "ds-code__head" },
      h("span", { className: "ds-code__filename" }, filename || language || "Snippet"),
      h("button", {
        type: "button",
        className: "ds-button ds-button--sm",
        "aria-label": copied ? "Copied" : "Copy code",
        onClick: onCopy,
      }, copied ? "Copied" : "Copy")
    ),
    // Code as TEXT content — never dangerouslySetInnerHTML.
    h("pre", { className: "ds-code__body" }, h("code", null, code))
  );
}
