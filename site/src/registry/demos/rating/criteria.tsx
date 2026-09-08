import * as React from "react"

import { Rating } from "@diametral/design-system/react"

const CRITERIA = ["Ponctualité", "Qualité", "Communication"]

export default function RatingCriteria() {
  const [scores, setScores] = React.useState<Record<string, number>>({
    Ponctualité: 5,
    Qualité: 4,
    Communication: 3,
  })

  const average =
    CRITERIA.reduce((total, name) => total + (scores[name] ?? 0), 0) /
    CRITERIA.length

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {CRITERIA.map((name) => (
        <div key={name} className="flex items-center justify-between gap-4">
          <span className="text-sm">{name}</span>
          <Rating
            aria-label={name}
            value={scores[name]}
            onValueChange={(next) =>
              setScores((current) => ({ ...current, [name]: next }))
            }
          />
        </div>
      ))}
      <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
        <span className="text-sm font-medium">Moyenne</span>
        <span className="text-sm text-muted-foreground tabular-nums">
          {average.toFixed(1)} / 5
        </span>
      </div>
    </div>
  )
}
