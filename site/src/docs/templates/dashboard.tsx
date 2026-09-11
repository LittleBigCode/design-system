import { Example, P } from "@/docs/foundation-example"

const ENTITIES = [
  ["LBC_FR", "22%", "2,14 19.6,12 37.2,15 54.8,9 72.4,11 88,6", undefined],
  ["LBC_BE", "29%", "2,16 19.6,13 37.2,11 54.8,8 72.4,5 88,2", "var(--ds-success)"],
  ["LBC_US", "17%", "2,8 19.6,10 37.2,9 54.8,12 72.4,11 88,13", undefined],
  ["LBC_CH", "12%", "2,4 19.6,7 37.2,9 54.8,10 72.4,14 88,16", "var(--ds-warning)"],
  ["LBC_DE", "25%", "2,11 19.6,9 37.2,10 54.8,7 72.4,8 88,5", undefined],
] as const

const KPIS = [
  ["Active missions", "137", "8 this week", "up"],
  ["Avg. margin", "24.6 %", "2.1 pts", "up"],
  ["At-risk rate", "5.2 %", "0.4 pts", "down"],
] as const

export function Dashboard() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Templates
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Dashboard
        </h1>
        <p className={`mt-3 ${P}`}>
          A full application screen: a{" "}
          <code className="font-mono text-xs">.ds-app-bar</code>, a{" "}
          <code className="font-mono text-xs">.ds-vnav</code> sidebar, a KPI
          row of <code className="font-mono text-xs">.ds-stat-card</code>{" "}
          cards,
          and a chart panel. The source page also renders a live,
          paginated <code className="font-mono text-xs">DataGrid</code>{" "}
          fetching from a mock server — simplified to a static table here,
          since the point of this preview is the layout, not a second
          copy of the data-table demo already on{" "}
          <code className="font-mono text-xs">/docs/data-table</code>.
        </p>
      </header>

      <Example
        label="Dashboard"
        center={false}
        code={
          '<header class="ds-app-bar">…</header>\n<div style="display:grid;grid-template-columns:248px 1fr">\n  <aside>\n    <nav class="ds-vnav" aria-label="Primary">\n      <div class="ds-vnav__group">\n        <span class="ds-vnav__label">Overview</span>\n        <a class="ds-vnav__item is-active" href="#" aria-current="page">Dashboard</a>\n      </div>\n    </nav>\n  </aside>\n  <main>\n    <div style="display:grid;grid-template-columns:repeat(4,1fr)">\n      <div class="ds-stat-card"><div class="ds-stat-card-label">Active missions</div><div class="ds-stat-card-value">137</div><span class="ds-stat-card-delta ds-stat-card-delta--up">8 this week</span></div>\n    </div>\n    <section class="ds-card">\n      <table class="ds-table ds-table--hover">…</table>\n    </section>\n  </main>\n</div>'
        }
      >
        <div className="w-full border border-border">
          <header className="ds-app-bar">
            <div className="ds-app-bar__inner">
              <span className="ds-wordmark">
                <svg
                  className="ds-wordmark__mark"
                  viewBox="0 0 56 56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <circle cx={28} cy={28} r={24} />
                  <rect x={12} y={12} width={32} height={32} />
                  <line x1={12} y1={44} x2={44} y2={12} />
                </svg>
                <span className="ds-wordmark__name">Diametral</span>
                <span className="ds-wordmark__sub">Console</span>
              </span>
              <div className="ds-app-bar__actions">
                <span className="ds-badge ds-badge--accent">Production</span>
                <button className="ds-button ds-button--primary" type="button">
                  New mission
                </button>
              </div>
            </div>
          </header>

          <div className="grid sm:grid-cols-[200px_1fr]">
            <aside className="border-e border-border p-4">
              <nav className="ds-vnav" aria-label="Primary">
                <div className="ds-vnav__group">
                  <span className="ds-vnav__label">Overview</span>
                  <a className="ds-vnav__item is-active" href="#" aria-current="page">
                    Dashboard
                  </a>
                  <a className="ds-vnav__item" href="#">
                    Activity
                  </a>
                </div>
                <div className="ds-vnav__group">
                  <span className="ds-vnav__label">Pricing</span>
                  <a className="ds-vnav__item" href="#">
                    Pricing matrix
                  </a>
                  <a className="ds-vnav__item" href="#">
                    Rate cards
                  </a>
                  <a className="ds-vnav__item" href="#">
                    Entities
                  </a>
                </div>
                <div className="ds-vnav__group">
                  <span className="ds-vnav__label">Account</span>
                  <a className="ds-vnav__item" href="#">
                    Reports
                  </a>
                  <a className="ds-vnav__item" href="#">
                    Settings
                  </a>
                </div>
              </nav>
            </aside>

            <main className="min-w-0 p-6">
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <div>
                  <h2 className="ds-title ds-title--lg">Dashboard</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pricing performance across all entities · Q2 2026
                  </p>
                </div>
                <button className="ds-button" type="button">
                  Export
                </button>
              </div>

              <div className="mb-5 grid gap-4 sm:grid-cols-3">
                {KPIS.map(([label, value, delta, direction]) => (
                  <div key={label} className="ds-stat-card">
                    <div className="ds-stat-card-label">{label}</div>
                    <div className="ds-stat-card-value">{value}</div>
                    <span
                      className={`ds-stat-card-delta ds-stat-card-delta--${direction}`}
                    >
                      {delta}
                    </span>
                  </div>
                ))}
              </div>

              <section className="ds-card p-5">
                <div className="mb-4 flex items-baseline justify-between">
                  <h3
                    style={{
                      fontFamily: "var(--ds-font-title)",
                      fontSize: 18,
                    }}
                  >
                    Margin by entity
                  </h3>
                  <span className="ds-label">Q2 2026</span>
                </div>
                <table className="ds-table ds-table--hover">
                  <thead>
                    <tr>
                      <th>Entity</th>
                      <th className="ds-table__num">Margin</th>
                      <th className="ds-table__num">6 months</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ENTITIES.map(([name, margin, points, color]) => (
                      <tr key={name}>
                        <td className="ds-table__name">{name}</td>
                        <td className="ds-table__num">{margin}</td>
                        <td className="ds-table__num">
                          <span
                            className="ds-sparkline"
                            role="img"
                            aria-label={`${name} margin over 6 months`}
                            style={color ? { color } : undefined}
                          >
                            <svg
                              className="ds-sparkline-svg"
                              width={90}
                              height={20}
                              viewBox="0 0 90 20"
                              preserveAspectRatio="none"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <polyline
                                className="ds-sparkline-line"
                                points={points}
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </main>
          </div>
        </div>
      </Example>
    </div>
  )
}
