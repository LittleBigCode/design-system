import { CodeBlock } from "@diametral/design-system/react"

const SNIPPET = `import "@diametral/design-system/dist/diametral.css"
import { Button } from "@diametral/design-system/react"

export function Save() {
  return <Button variant="primary">Save changes</Button>
}`

export default function CodeBlockBasic() {
  return <CodeBlock code={SNIPPET} language="tsx" filename="save-button.tsx" />
}
