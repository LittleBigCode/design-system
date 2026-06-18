# Forms

The form layer is a thin, dependency-free pairing of one hook and one component
that lets teams build **validated forms** on top of the DS fields
(`Input`, `Select`, `Textarea`, `Checkbox`, `Switch`, …) without pulling in a
form library:

- [`useForm`](../react/hooks/useForm.js) — holds values, errors, touched and
  submitting state, and hands you a `register(name)` spread and a
  `handleSubmit(onValid)` event handler.
- [`FormField`](../react/components/FormField.js) — a labelled field row that
  wraps a control in the DS `Field` and renders the matching inline error (or a
  neutral hint) underneath via `FieldHint`.

```js
import { useForm, FormField, Input, Select, Button } from "@diametral/design-system/react";
import "@diametral/design-system/css/diametral.css"; // once, at your app root
```

## `useForm({ initialValues, validate })`

`validate(values)` is a plain synchronous function that returns an **errors
object** keyed by field name (`{ field: "message" }`). Return an empty object
when everything is valid.

The hook returns:

| Key | What it is |
|---|---|
| `values` | Current field values. |
| `errors` | Validation messages, **already filtered** to fields that are `touched` or have been through a submit attempt — render these directly. |
| `touched` | Which fields have been blurred / marked touched on submit. |
| `isSubmitting` | `true` while your async `onValid` runs — wire it to a `Button`'s `loading`. |
| `setValue(name, value)` | Imperatively set one field (handy for custom controls). |
| `register(name)` | Returns `{ name, value, onChange, onBlur }` to spread onto a DS field. `onChange` reads `e.target.checked` for checkboxes, else `e.target.value`; `onBlur` marks the field touched. |
| `handleSubmit(onValid)` | Returns a form `onSubmit` handler: it `preventDefault`s, marks every field touched, validates, and — if valid — `await`s `onValid(values)` while toggling `isSubmitting`. If invalid, it sets `errors` and never calls `onValid`. |
| `reset(nextValues?)` | Reset to `initialValues` (or to `nextValues`). |

Errors are surfaced once a field is **touched** (after the user blurs it) **or**
after the first submit attempt — so the form stays quiet until the user has had
a chance to fill it in, then shows everything at once on submit.

## Worked example: a "Create project" form

This form collects a project name, a visibility, and an optional description. It
validates inline, blocks submit while invalid, and simulates an async save.

```jsx
import { useForm, FormField, Input, Select, Textarea, Button } from "@diametral/design-system/react";

const VISIBILITY = [
  { value: "private", label: "Private — only invited members" },
  { value: "team", label: "Team — everyone in the workspace" },
  { value: "public", label: "Public — anyone with the link" },
];

function validate(values) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Project name is required";
  else if (name.length < 3) errors.name = "Use at least 3 characters";

  if (!values.visibility) errors.visibility = "Pick a visibility";

  if (values.description.length > 280)
    errors.description = "Keep the description under 280 characters";

  return errors; // {} === valid
}

function CreateProjectForm({ onCreate }) {
  const form = useForm({
    initialValues: { name: "", visibility: "private", description: "" },
    validate,
  });

  const submit = form.handleSubmit(async (values) => {
    // values is guaranteed valid here.
    await onCreate({ ...values, name: values.name.trim() });
    form.reset();
  });

  return (
    <form onSubmit={submit} noValidate>
      <FormField
        label="Project name"
        htmlFor="project-name"
        hint="Shown to everyone in the workspace"
        error={form.errors.name}
      >
        <Input id="project-name" placeholder="Acme pricing" {...form.register("name")} />
      </FormField>

      <FormField label="Visibility" htmlFor="project-visibility" error={form.errors.visibility}>
        <Select
          id="project-visibility"
          options={VISIBILITY}
          {...form.register("visibility")}
        />
      </FormField>

      <FormField
        label="Description"
        htmlFor="project-description"
        hint="Optional — up to 280 characters"
        error={form.errors.description}
      >
        <Textarea
          id="project-description"
          rows={3}
          placeholder="What is this project for?"
          {...form.register("description")}
        />
      </FormField>

      <Button type="submit" variant="primary" loading={form.isSubmitting}>
        Create project
      </Button>
    </form>
  );
}
```

### What happens

- **Spreading `register("name")`** wires `value`/`onChange` (controlled input)
  plus an `onBlur` that marks the field touched. Always give the control an
  `id` that matches the `FormField`'s `htmlFor` so the label is clickable.
- **`FormField`** renders the label via the DS `Field`, then puts a
  `FieldHint status="error"` with `form.errors.<field>` under the control when
  there is an error — otherwise it shows the neutral `hint`. Because `useForm`
  only exposes an error once the field is touched or the form was submitted, the
  hints stay neutral until the user interacts.
- **Submitting** runs `validate`. If it returns any keys, every field is marked
  touched, all messages appear, and `onCreate` is **not** called. If it returns
  `{}`, `onCreate(values)` runs with `isSubmitting` flipped to `true` (so the
  `Button` shows its spinner) and the form resets on success.

### Checkboxes and switches

`register`'s `onChange` reads `e.target.checked` for checkbox inputs, so it
works directly with a native checkbox. For controls that emit a value rather
than a DOM event (e.g. the DS `Switch`, which calls `onChange(checked)`), use
`setValue` instead:

```jsx
<Switch
  checked={form.values.notify}
  onChange={(checked) => form.setValue("notify", checked)}
>
  Email me when the project is ready
</Switch>
```
