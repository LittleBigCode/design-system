import { Example, P } from "@/docs/foundation-example"

export function Error404() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Templates
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          404
        </h1>
        <p className={`mt-3 ${P}`}>
          A standalone error page: the <code className="font-mono text-xs">.ds-empty</code>{" "}
          pattern scaled up and centered on the brand background, its own
          frame rather than the docs chrome.
        </p>
      </header>

      <Example
        label="Page not found"
        code={
          '<div class="ds-empty">\n  <div class="ds-empty-header">\n    <div class="ds-empty-media ds-empty-media--icon" style="font-size:72px"><svg width="72" height="72">…</svg></div>\n    <h1 class="ds-empty-title">Page not found</h1>\n    <p class="ds-empty-description">We couldn\'t find the page you were looking for. It may have been moved, renamed, or never existed.</p>\n  </div>\n  <div class="ds-empty-content">\n    <a class="ds-button ds-button--primary" href="/">Back to home</a>\n  </div>\n</div>'
        }
      >
        <div
          className="flex min-h-96 w-full items-center justify-center border border-border p-8"
          style={{ background: "var(--ds-bg)" }}
        >
          <div className="ds-empty">
            <div className="ds-empty-header">
              <div
                className="ds-empty-media ds-empty-media--icon"
                style={{ fontSize: 72 }}
              >
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width={72}
                  height={72}
                  aria-hidden="true"
                >
                  <circle cx={21} cy={21} r={14} />
                  <line x1={31} y1={31} x2={42} y2={42} />
                  <line x1={15} y1={15} x2={27} y2={27} />
                </svg>
              </div>
              <h1 className="ds-empty-title">Page not found</h1>
              <p className="ds-empty-description">
                We couldn't find the page you were looking for. It may have
                been moved, renamed, or never existed.
              </p>
            </div>
            <div className="ds-empty-content">
              <a className="ds-button ds-button--primary" href="#">
                Back to home
              </a>
            </div>
          </div>
        </div>
      </Example>
    </div>
  )
}
