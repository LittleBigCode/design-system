# React components

Real React components for the Diametral Design System. They are plain ES modules
(authored with `React.createElement`, no JSX), so they ship with **no build step** and run
both from npm in any React app and directly in the browser via an import map.

Styling comes from the global stylesheet — load it once:

```js
import "@littlebigcode/design-system/css/diametral.css";
```

`react` and `react-dom` (>=18) are peer dependencies.

## Usage

```jsx
import { Button, Status, Metric, Callout, Switch, Modal } from "@littlebigcode/design-system/react";

function Example() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open</Button>

      <Status status="success" kicker="Approval level" heading="Full delegation"
              subtitle="Approve without arbitration">
        <div className="ds-status__body">
          <Metric label="Margin" value="38 %" variant="hero" sign={1} />
          <Metric label="Day rate" value="€900" />
        </div>
      </Status>

      <Callout type="info" heading="Heads up">Informational message.</Callout>

      <Modal open={open} onClose={() => setOpen(false)} heading="Settings"
             footer={<Button variant="primary" onClick={() => setOpen(false)}>Save</Button>}>
        <p>Body content…</p>
      </Modal>
    </>
  );
}
```

## Components

| Export | Notable props |
|---|---|
| `Button` | `variant?: "primary" \| "danger"`, plus all `<button>` props; `forwardRef` |
| `Input` | `number?: boolean`, plus all `<input>` props; `forwardRef` |
| `Field` | `label`, `htmlFor`, `children` |
| `Badge` | `variant?: "solid" \| "accent"` |
| `Chip` | `warn?: boolean` |
| `Banner` | `<div>` props |
| `Callout` | `type?: "info" \| "success" \| "warning" \| "danger"`, `heading?` |
| `Panel` | `title?`, `rows?: boolean` |
| `SectionHeading` | `as?` (default `h3`) |
| `Status` | `status`, `kicker?`, `heading?`, `subtitle?` (body via children) |
| `Metric` | `label`, `value`, `variant?: "hero" \| "sub"`, `sign?` |
| `Switch` | `checked` / `defaultChecked`, `onChange(checked, e)`, `disabled`, `name` |
| `Tabs` | `items: {id,label,sublabel?,content?}[]`, `value?` / `defaultValue?`, `onChange?` |
| `Segmented` | `items: {value,label,dot?}[]`, `value?` / `defaultValue?`, `onChange?` |
| `Modal` | `open`, `onClose`, `heading?`, `footer?` — portals to `<body>`, closes on Esc/backdrop |
| `Wordmark` | `name?`, `sub?` |

Full TypeScript types ship in `index.d.ts`. A live, buildless demo is at
[`examples/react.html`](../examples/react.html).
