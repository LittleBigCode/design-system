import { Checkbox } from "@diametral/ui/components/checkbox"
import { Label } from "@diametral/ui/components/label"

const TASKS = [
  { id: "tokens", label: "Publish the token package", done: true },
  { id: "contrast", label: "Run the contrast audit", done: true },
  { id: "changelog", label: "Write the changelog", done: false },
  { id: "tag", label: "Tag the release", done: false },
]

export default function CheckboxTaskList() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {TASKS.map((task) => (
        <div key={task.id} className="flex items-center gap-2.5">
          <Checkbox
            id={`checkbox-task-${task.id}`}
            defaultChecked={task.done}
          />
          <Label
            htmlFor={`checkbox-task-${task.id}`}
            className="peer-data-checked:text-muted-foreground peer-data-checked:line-through"
          >
            {task.label}
          </Label>
        </div>
      ))}
    </div>
  )
}
