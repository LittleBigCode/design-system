import { Slider } from "@diametral/ui/components/slider"

const CHANNELS = [
  { id: "master", label: "Master", level: 80 },
  { id: "voice", label: "Voice", level: 65 },
  { id: "music", label: "Music", level: 40 },
]

export default function SliderVertical() {
  return (
    <div className="flex h-52 items-stretch gap-10">
      {CHANNELS.map((channel) => (
        <div key={channel.id} className="flex flex-col items-center gap-3">
          <Slider
            orientation="vertical"
            defaultValue={channel.level}
            aria-labelledby={`slider-channel-${channel.id}-label`}
            className="flex-1"
          />
          <span
            id={`slider-channel-${channel.id}-label`}
            className="text-xs text-muted-foreground"
          >
            {channel.label}
          </span>
        </div>
      ))}
    </div>
  )
}
