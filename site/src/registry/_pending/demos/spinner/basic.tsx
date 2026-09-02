import { Spinner } from "@diametral/ui/components/spinner"

export default function SpinnerBasic() {
  return (
    <div className="flex items-center gap-6">
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="size-8 text-muted-foreground" />
    </div>
  )
}
