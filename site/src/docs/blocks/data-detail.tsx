import { Example, P, Section } from "@/docs/foundation-example"

const TIMELINE = [
  ["success", "Mission confirmed", "09:42", "Day rate locked at €900 after Director sign-off."],
  ["info", "Review requested", "09:30", "Sent to the Director for approval."],
  ["warning", "Margin below target", "08:15", "Computed margin 28% — under the 30% floor."],
  ["danger", "Currency missing", "Yesterday", "Salary entered without a currency."],
  ["", "Draft created", "2 days ago", "Imported from the Q3 template."],
] as const

export function DataDetail() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Blocks
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Data &amp; detail
        </h1>
        <p className={`mt-3 ${P}`}>
          Composed layouts for reading and acting on a single record: a
          detail page split, an empty placeholder, a faceted result browser,
          an activity feed, and a destructive confirmation. Each is assembled
          only from existing <code className="font-mono text-xs">.ds-*</code>{" "}
          primitives — flat, 1px, no radius, no shadow.
        </p>
      </header>

      <Section title="Detail layout">
        <p className={P}>
          A primary <code className="font-mono text-xs">.ds-card</code> for
          the record body beside a 320px{" "}
          <code className="font-mono text-xs">.ds-card</code> sidebar
          holding a{" "}
          <code className="font-mono text-xs">.ds-description-list</code>{" "}
          key/value readout.
        </p>
        <Example
          label="Main + detail sidebar"
          center={false}
          code={
            '<div style="display:grid;grid-template-columns:1fr 320px;gap:20px">\n  <article class="ds-card">\n    <div class="ds-card__header"><h3 class="ds-card__title">Acme Consulting — Senior data engineer</h3></div>\n    <div class="ds-card__body"><p>A 6-month mission to migrate the reporting warehouse…</p></div>\n  </article>\n  <aside class="ds-card">\n    <div class="ds-card__block">\n      <dl class="ds-description-list">\n        <dt class="ds-description-term">Status</dt><dd class="ds-description-detail"><span class="ds-tag ds-tag--success">Confirmed</span></dd>\n        <dt class="ds-description-term">Owner</dt><dd class="ds-description-detail">Vincent Devillers</dd>\n      </dl>\n    </div>\n  </aside>\n</div>'
          }
        >
          <div className="grid w-full gap-5 sm:grid-cols-[1fr_320px]">
            <article className="ds-card">
              <div className="ds-card__header">
                <h3 className="ds-card__title">
                  Acme Consulting — Senior data engineer
                </h3>
              </div>
              <div className="ds-card__body">
                <p>
                  A 6-month mission to migrate the reporting warehouse. The
                  day rate is computed from the target salary, the agreed
                  margin, and rebilled travel capped at €200 per day.
                </p>
              </div>
            </article>
            <aside className="ds-card">
              <div className="ds-card__block">
                <dl className="ds-description-list">
                  <dt className="ds-description-term">Status</dt>
                  <dd className="ds-description-detail">
                    <span className="ds-tag ds-tag--success">Confirmed</span>
                  </dd>
                  <dt className="ds-description-term">Owner</dt>
                  <dd className="ds-description-detail">
                    Vincent Devillers
                  </dd>
                  <dt className="ds-description-term">Created</dt>
                  <dd className="ds-description-detail">2026-05-02</dd>
                  <dt className="ds-description-term">Updated</dt>
                  <dd className="ds-description-detail">2026-06-17</dd>
                </dl>
              </div>
            </aside>
          </div>
        </Example>
      </Section>

      <Section title="Empty state">
        <p className={P}>
          A <code className="font-mono text-xs">.ds-empty</code> placeholder
          — icon, title, description, and a primary action — set inside a
          bordered <code className="font-mono text-xs">.ds-card</code>.
        </p>
        <Example
          label="Empty in a card"
          center={false}
          code={
            '<div class="ds-card">\n  <div class="ds-empty">\n    <div class="ds-empty-header">\n      <div class="ds-empty-media ds-empty-media--icon" aria-hidden="true"><svg>…</svg></div>\n      <p class="ds-empty-title">No missions yet</p>\n      <p class="ds-empty-description">Create your first mission to compute a day rate…</p>\n    </div>\n    <div class="ds-empty-content">\n      <button class="ds-button ds-button--primary">New mission</button>\n    </div>\n  </div>\n</div>'
          }
        >
          <div className="ds-card w-full">
            <div className="ds-empty">
              <div className="ds-empty-header">
                <div
                  className="ds-empty-media ds-empty-media--icon"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <rect x={3} y={4} width={18} height={16} />
                    <line x1={3} y1={9} x2={21} y2={9} />
                  </svg>
                </div>
                <p className="ds-empty-title">No missions yet</p>
                <p className="ds-empty-description">
                  Create your first mission to compute a day rate, margin,
                  and target salary.
                </p>
              </div>
              <div className="ds-empty-content">
                <button className="ds-button ds-button--primary">
                  New mission
                </button>
              </div>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Faceted filter">
        <p className={P}>
          A <code className="font-mono text-xs">.ds-card</code> facet panel
          of <code className="font-mono text-xs">.ds-checkbox</code> groups
          and <code className="font-mono text-xs">.ds-tag</code> chips
          beside a <code className="font-mono text-xs">.ds-card</code>{" "}
          result list.
        </p>
        <Example
          label="Facets + results"
          center={false}
          code={
            '<div style="display:grid;grid-template-columns:240px 1fr;gap:20px">\n  <aside class="ds-card">\n    <div class="bk-group">\n      <p class="bk-group__title">Status</p>\n      <label class="ds-checkbox"><input type="checkbox" checked><span class="ds-checkbox__box"></span> Confirmed</label>\n    </div>\n    <div class="bk-group">\n      <p class="bk-group__title">Discipline</p>\n      <span class="ds-tag ds-tag--info">Data</span> <span class="ds-tag">Design</span>\n    </div>\n  </aside>\n  <section class="ds-card">\n    <div class="bk-result"><span>Acme — Senior data engineer</span><span>€900 / day</span></div>\n  </section>\n</div>'
          }
        >
          <div className="grid w-full gap-5 sm:grid-cols-[240px_1fr]">
            <aside className="ds-card">
              <div className="border-b border-[var(--ds-rule-soft)] px-5 py-4">
                <p className="mb-3 text-[11px] tracking-wider text-muted-foreground uppercase">
                  Status
                </p>
                <div className="flex flex-col gap-2.5">
                  <label className="ds-checkbox">
                    <input type="checkbox" defaultChecked />
                    <span className="ds-checkbox__box" /> Confirmed
                  </label>
                  <label className="ds-checkbox">
                    <input type="checkbox" />
                    <span className="ds-checkbox__box" /> Draft
                  </label>
                  <label className="ds-checkbox">
                    <input type="checkbox" />
                    <span className="ds-checkbox__box" /> Archived
                  </label>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="mb-3 text-[11px] tracking-wider text-muted-foreground uppercase">
                  Discipline
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="ds-tag ds-tag--info">Data</span>
                  <span className="ds-tag">Design</span>
                  <span className="ds-tag">Ops</span>
                  <span className="ds-tag">Sales</span>
                </div>
              </div>
            </aside>
            <section className="ds-card">
              {[
                ["Acme — Senior data engineer", "€900 / day"],
                ["Globex — Staff designer", "€820 / day"],
                ["Initech — Platform lead", "€1,050 / day"],
              ].map(([name, rate]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-3 border-t border-[var(--ds-rule-soft)] px-5 py-3.5 first:border-t-0"
                >
                  <span>{name}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {rate}
                  </span>
                </div>
              ))}
            </section>
          </div>
        </Example>
      </Section>

      <Section title="Activity feed">
        <p className={P}>
          A <code className="font-mono text-xs">.ds-timeline</code> of
          record events; <code className="font-mono text-xs">is-*</code>{" "}
          recolors each{" "}
          <code className="font-mono text-xs">.ds-timeline-indicator</code>{" "}
          by status.
        </p>
        <Example
          label=".ds-timeline"
          center={false}
          code={
            '<ol class="ds-timeline">\n  <li class="ds-timeline-item ds-timeline-item--success" data-state="completed">\n    <div class="ds-timeline-indicator"></div>\n    <div class="ds-timeline-content">\n      <div class="ds-timeline-title">Mission confirmed</div>\n      <time class="ds-timeline-time">09:42</time>\n      <p class="ds-timeline-description">Day rate locked at €900 after Director sign-off.</p>\n    </div>\n  </li>\n  <!-- …more events… -->\n</ol>'
          }
        >
          <ol className="ds-timeline w-full">
            {TIMELINE.map(([tone, title, time, description]) => (
              <li
                key={title}
                className={
                  tone
                    ? `ds-timeline-item ds-timeline-item--${tone}`
                    : "ds-timeline-item"
                }
                data-state="completed"
              >
                <div className="ds-timeline-indicator" />
                <div className="ds-timeline-content">
                  <div className="ds-timeline-title">{title}</div>
                  <time className="ds-timeline-time">{time}</time>
                  <p className="ds-timeline-description">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Example>
      </Section>

      <Section title="Confirmation dialog">
        <p className={P}>
          A destructive confirm built from{" "}
          <code className="font-mono text-xs">.ds-modal</code>. The fixed{" "}
          <code className="font-mono text-xs">.ds-overlay</code> backdrop is
          set to flow here so it renders inline; a{" "}
          <code className="font-mono text-xs">.ds-modal__spacer</code>{" "}
          pushes Cancel + the danger Confirm to the right.
        </p>
        <Example
          label="Destructive confirm"
          center={false}
          code={
            '<div class="ds-overlay is-open">\n  <div class="ds-modal">\n    <div class="ds-modal__head">\n      <h2 class="ds-modal__title">Delete mission</h2>\n      <button class="ds-button ds-modal__close">Close</button>\n    </div>\n    <div class="ds-modal__body">\n      <p>Deleting <strong>Acme — Senior data engineer</strong> removes its rate, margin, and history. This cannot be undone.</p>\n    </div>\n    <div class="ds-modal__foot">\n      <span class="ds-modal__spacer"></span>\n      <button class="ds-button">Cancel</button>\n      <button class="ds-button ds-button--danger">Delete mission</button>\n    </div>\n  </div>\n</div>'
          }
        >
          <div
            className="ds-overlay is-open flex w-full p-0"
            style={{ position: "static" }}
          >
            <div className="ds-modal max-h-none">
              <div className="ds-modal__head">
                <h2 className="ds-modal__title">Delete mission</h2>
                <button className="ds-button ds-modal__close">Close</button>
              </div>
              <div className="ds-modal__body">
                <p>
                  Deleting{" "}
                  <strong>Acme — Senior data engineer</strong> removes its
                  rate, margin, and activity history. This cannot be undone.
                </p>
              </div>
              <div className="ds-modal__foot">
                <span className="ds-modal__spacer" />
                <button className="ds-button">Cancel</button>
                <button className="ds-button ds-button--danger">
                  Delete mission
                </button>
              </div>
            </div>
          </div>
        </Example>
      </Section>
    </div>
  )
}
