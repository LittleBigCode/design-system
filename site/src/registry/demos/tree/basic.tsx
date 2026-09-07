import {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemTrigger,
  TreeLeaf,
} from "@diametral/design-system/react"

type Node = {
  id: string
  label: string
  children?: Node[]
}

const NODES: Node[] = [
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
      { id: "tree-src", label: "components/tree.tsx" },
    ],
  },
  { id: "tokens-json", label: "tokens/tokens.json" },
]

const DEFAULT_EXPANDED = new Set(["css", "components"])

function TreeNode({ node }: { node: Node }) {
  if (!node.children) {
    return <TreeLeaf>{node.label}</TreeLeaf>
  }

  return (
    <TreeItem defaultOpen={DEFAULT_EXPANDED.has(node.id)}>
      <TreeItemTrigger>{node.label}</TreeItemTrigger>
      <TreeItemContent>
        {node.children.map((child) => (
          <TreeNode key={child.id} node={child} />
        ))}
      </TreeItemContent>
    </TreeItem>
  )
}

export default function TreeBasic() {
  return (
    <Tree>
      {NODES.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </Tree>
  )
}
