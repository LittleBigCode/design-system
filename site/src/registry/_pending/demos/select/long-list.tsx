import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@diametral/ui/components/select"

const TIMEZONES = {
  "utc-8": "Los Angeles — UTC−8",
  "utc-6": "Mexico City — UTC−6",
  "utc-5": "New York — UTC−5",
  "utc-3": "São Paulo — UTC−3",
  utc: "London — UTC",
  "utc+1": "Paris — UTC+1",
  "utc+2": "Athens — UTC+2",
  "utc+3": "Nairobi — UTC+3",
  "utc+4": "Dubai — UTC+4",
  "utc+5.5": "Mumbai — UTC+5:30",
  "utc+7": "Bangkok — UTC+7",
  "utc+8": "Singapore — UTC+8",
  "utc+9": "Tokyo — UTC+9",
  "utc+11": "Sydney — UTC+11",
}

export default function SelectLongList() {
  return (
    <Select items={TIMEZONES} defaultValue="utc+1">
      <SelectTrigger aria-label="Time zone">
        <SelectValue placeholder="Pick a time zone" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(TIMEZONES).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
