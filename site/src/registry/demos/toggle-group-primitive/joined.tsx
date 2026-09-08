import {
  ToggleGroup,
  ToggleGroupItem,
} from "@diametral/design-system/react"

export default function ToggleGroupPrimitiveJoined() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <ToggleGroup variant="outline" spacing={0} defaultValue={["month"]}>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
        <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        variant="outline"
        spacing={0}
        orientation="vertical"
        defaultValue={["list"]}
      >
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="board">Board</ToggleGroupItem>
        <ToggleGroupItem value="calendar">Calendar</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
