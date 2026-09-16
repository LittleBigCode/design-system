const FEATURES = [
  {
    label: "Map",
    title: "Delegation matrix",
    copy: "Encode thresholds and approval rules so every quote follows the same defensible path.",
  },
  {
    label: "Build",
    title: "Margin engine",
    copy: "Compose cost, staffing and risk into a live margin you can inspect line by line.",
  },
  {
    label: "Run",
    title: "Audit trail",
    copy: "Every change is recorded and reportable — pricing decisions stay traceable over time.",
  },
]

export default function Features01() {
  return (
    <div className="ds-ruled w-full">
      {FEATURES.map((feature) => (
        <div key={feature.label} className="ds-ruled__col">
          <span className="ds-gridlabel">{feature.label}</span>
          <h3 className="font-heading mt-3 mb-1.5 text-lg font-light">
            {feature.title}
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            {feature.copy}
          </p>
        </div>
      ))}
    </div>
  )
}
