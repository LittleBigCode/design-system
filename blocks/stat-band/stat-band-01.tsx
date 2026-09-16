const STATS = [
  { label: "Active rates", value: "128", unit: null },
  { label: "Avg. margin", value: "31", unit: "%" },
  { label: "Profiles", value: "42", unit: null },
  { label: "Updated", value: "2", unit: " days ago" },
]

/** `.ds-statgrid` is grid-system CSS with no React binding — the markup is the
 *  component. */
export default function StatBand01() {
  return (
    <div className="ds-statgrid w-full">
      {STATS.map((stat) => (
        <div key={stat.label} className="ds-statgrid__cell">
          <div className="ds-statgrid__label">{stat.label}</div>
          <div className="ds-statgrid__value">
            {stat.value}
            {stat.unit ? <small>{stat.unit}</small> : null}
          </div>
        </div>
      ))}
    </div>
  )
}
