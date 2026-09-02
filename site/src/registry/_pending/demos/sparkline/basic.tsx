import { Sparkline } from "@diametral/ui/components/sparkline"

const REQUESTS = [820, 932, 901, 934, 1290, 1330, 1120, 1450]

export default function SparklineBasic() {
  return (
    <div className="flex w-full max-w-xs items-center justify-between gap-4">
      <div>
        <div className="text-[0.6875rem] tracking-wider text-muted-foreground uppercase">
          Requests / min
        </div>
        <div className="font-heading text-2xl font-semibold tabular-nums">
          1 450
        </div>
      </div>
      <Sparkline
        data={REQUESTS}
        aria-label="Requests per minute, last 8 hours"
      />
    </div>
  )
}
