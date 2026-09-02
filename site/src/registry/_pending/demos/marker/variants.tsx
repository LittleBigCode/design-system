import { Marker, MarkerContent } from "@diametral/ui/components/marker"

export default function MarkerVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Marker>
        <MarkerContent>Plain</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Centred between rules</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Underlined section</MarkerContent>
      </Marker>
    </div>
  )
}
