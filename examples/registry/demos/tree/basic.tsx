import { Tree } from "@diametral/design-system/react"

const NODES = [
  {
    id: "css",
    label: "css/",
    children: [
      { id: "tokens", label: "tokens.css" },
      {
        id: "components",
        label: "components/",
        children: [
          { id: "button", label: "button.css" },
          { id: "tabs", label: "tabs.css" },
        ],
      },
    ],
  },
  {
    id: "react",
    label: "react/",
    children: [
      { id: "index", label: "index.tsx" },
      { id: "tree-src", label: "components/Tree.tsx" },
    ],
  },
  { id: "tokens-json", label: "tokens/tokens.json" },
]

export default function TreeBasic() {
  return <Tree nodes={NODES} defaultExpanded={["css", "components"]} />
}
