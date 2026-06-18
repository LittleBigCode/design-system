import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Tag input / token field --------------------------------------------
   A flex-wrap .ds-tag-input box holding removable tokens plus a text input.
   Enter or a comma adds the current text as a token; Backspace on an empty
   field removes the last token; each token's × removes it. Controlled (`value`)
   or uncontrolled (`defaultValue`) — the value is a string[]. Clicking the box
   focuses the field. Styling: css/components/tag-input.css. */
export const TagInput = React.forwardRef(function TagInput(
  { value, defaultValue, onChange, placeholder, disabled, className, ...rest },
  ref
) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? []);
  const tokens = controlled ? value : internal;

  const [draft, setDraft] = React.useState("");
  const inputRef = React.useRef(null);

  function setTokens(next) {
    if (!controlled) setInternal(next);
    onChange && onChange(next);
  }

  function add(raw) {
    const v = raw.trim();
    if (!v || tokens.includes(v)) { setDraft(""); return; }
    setTokens([...tokens, v]);
    setDraft("");
  }

  function removeAt(i) {
    setTokens(tokens.filter((_, idx) => idx !== i));
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    } else if (e.key === "Backspace" && draft === "" && tokens.length) {
      e.preventDefault();
      removeAt(tokens.length - 1);
    }
  }

  return h("div", {
      className: cx("ds-tag-input", disabled && "is-disabled", className),
      onMouseDown: (e) => {
        // Focus the field when clicking blank space (but let token buttons work).
        if (e.target === e.currentTarget && inputRef.current) {
          e.preventDefault();
          inputRef.current.focus();
        }
      },
      ...rest,
    },
    tokens.map((tok, i) =>
      h("span", { key: `${tok}-${i}`, className: "ds-tag-input__token" },
        tok,
        h("button", {
          className: "ds-tag-input__remove",
          type: "button",
          tabIndex: -1,
          "aria-label": `Remove ${tok}`,
          disabled: disabled || undefined,
          onClick: () => removeAt(i),
        }, "×")
      )
    ),
    h("input", {
      ref: (node) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      className: "ds-tag-input__field",
      type: "text",
      value: draft,
      placeholder: tokens.length === 0 ? placeholder : undefined,
      disabled,
      onChange: (e) => setDraft(e.target.value),
      onKeyDown,
      onBlur: () => add(draft),
    })
  );
});
