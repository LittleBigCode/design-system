const STATS = [
  { label: "Quotes priced", value: "12", unit: " k" },
  { label: "Avg. margin lift", value: "8", unit: " pts" },
  { label: "Teams", value: "240", unit: " +" },
  { label: "Uptime", value: "99.9", unit: " %" },
]

/** The marketing-page "impact in numbers" band: same `.ds-statgrid`, framed and
 *  led by a kicker instead of sitting bare under app chrome. */
export default function StatBand02() {
  return (
    <section className="w-full px-8 py-14">
      <p className="ds-kicker">Impact in numbers</p>
      <div className="ds-statgrid mt-6 w-full">
        {STATS.map((stat) => (
          <div key={stat.label} className="ds-statgrid__cell">
            <div className="ds-statgrid__label">{stat.label}</div>
            <div className="ds-statgrid__value">
              {stat.value}
              <small>{stat.unit}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
