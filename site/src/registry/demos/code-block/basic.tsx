import {
  CodeBlock,
  CodeBlockHead,
  CodeBlockFilename,
  CodeBlockBody,
  CodeBlockCopyButton,
} from "@diametral/design-system/react"

const SNIPPET = `import "@diametral/design-system/dist/diametral.css"
import { Button } from "@diametral/design-system/react"

export function Save() {
  return <Button variant="primary">Save changes</Button>
}`

export default function CodeBlockBasic() {
  return (
    <CodeBlock>
      <CodeBlockHead>
        <CodeBlockFilename>save-button.tsx</CodeBlockFilename>
        <CodeBlockCopyButton value={SNIPPET} />
      </CodeBlockHead>
      <CodeBlockBody code={SNIPPET} />
    </CodeBlock>
  )
}
