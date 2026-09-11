import { Skeleton } from "@diametral/design-system/react"

export default function SkeletonBasic() {
  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      {/* The variants are the stylesheet's, not utilities: skeleton.css is a
          held file, so `--circle` and `--text` are the shapes a consumer with
          no Tailwind writes. `--circle` is square on purpose — the no-radius
          parti pris applies to a placeholder like anything else. */}
      <Skeleton className="ds-skeleton--circle" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="ds-skeleton--text" style={{ width: "66%" }} />
        <Skeleton className="ds-skeleton--text" style={{ width: "33%" }} />
      </div>
    </div>
  )
}
