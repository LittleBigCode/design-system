import { MinusIcon } from "@phosphor-icons/react"

/* Stylesheet-only component: `input-otp`'s React binding wraps the `input-otp`
   package, whose whole substance is the hidden-input trick that makes a row of
   boxes behave like one field — paste, backspace across a boundary, autofill
   from an SMS. That dependency is not acquired, so the classes below are the
   whole contract: this is the markup a binding has to produce.

   The structure is the point. One real input carries the value and takes the
   keyboard; the boxes only display it, which is why `data-active` marks the
   caret's box and why the caret itself is a painted div rather than the
   browser's. A binding fills in the characters and moves `data-active`; the
   stylesheet does the rest. */
export default function InputOtpBasic() {
  const code = ["4", "1", "9", "", "", ""]

  return (
    <div className="ds-input-otp">
      {/* The real field. A binding renders it transparent over the boxes; here
          it is only present so the label and the value have somewhere to live. */}
      <input
        className="ds-input-otp-input sr-only"
        aria-label="One-time code"
        autoComplete="one-time-code"
        inputMode="numeric"
        maxLength={6}
        defaultValue="419"
      />
      <div className="ds-input-otp-group" aria-hidden="true">
        {code.slice(0, 3).map((char, index) => (
          <div key={index} className="ds-input-otp-slot">
            {char}
          </div>
        ))}
      </div>
      <div className="ds-input-otp-separator" role="separator">
        <MinusIcon />
      </div>
      <div className="ds-input-otp-group" aria-hidden="true">
        {code.slice(3).map((char, index) => (
          <div
            key={index}
            className="ds-input-otp-slot"
            // The box the caret is in. A binding tracks this; the stylesheet
            // draws the focused rule and the blinking line from it.
            data-active={index === 0 ? "true" : undefined}
          >
            {char}
            {index === 0 ? (
              <div className="ds-input-otp-slot-caret">
                <div className="ds-input-otp-slot-caret-line" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
