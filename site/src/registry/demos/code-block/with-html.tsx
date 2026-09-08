import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHead,
} from "@diametral/design-system/react"

const CODE = `const tone = "success"`
const HTML = `<span style="color:#ff5500">const</span> tone = <span style="color:#89fc79">"success"</span>`

export default function CodeBlockWithHtml() {
  return (
    <CodeBlock className="w-full max-w-lg">
      <CodeBlockHead>
        <CodeBlockFilename>tone.ts</CodeBlockFilename>
        <CodeBlockCopyButton value={CODE} />
      </CodeBlockHead>
      <CodeBlockBody html={HTML} />
    </CodeBlock>
  )
}
