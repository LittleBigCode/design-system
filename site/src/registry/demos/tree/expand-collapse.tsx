import * as React from "react"
import { FileTsIcon, FolderIcon } from "@phosphor-icons/react"

import {
  Button,
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemTrigger,
  TreeLeaf,
} from "@diametral/design-system/react"

const BRANCHES = [
  { name: "components", files: ["button.tsx", "panel.tsx"] },
  { name: "hooks", files: ["use-theme.ts"] },
  { name: "lib", files: ["utils.ts"] },
]

export default function TreeExpandCollapse() {
  const [open, setOpen] = React.useState(["components"])

  const toggle = (name: string) =>
    setOpen((current) =>
      current.includes(name)
        ? current.filter((branch) => branch !== name)
        : [...current, name]
    )

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(BRANCHES.map((branch) => branch.name))}
        >
          Expand all
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setOpen([])}>
          Collapse all
        </Button>
      </div>
      <Tree>
        {BRANCHES.map((branch) => (
          <TreeItem
            key={branch.name}
            open={open.includes(branch.name)}
            onOpenChange={() => toggle(branch.name)}
          >
            <TreeItemTrigger>
              <FolderIcon /> {branch.name}
            </TreeItemTrigger>
            <TreeItemContent>
              {branch.files.map((file) => (
                <TreeLeaf key={file}>
                  <FileTsIcon /> {file}
                </TreeLeaf>
              ))}
            </TreeItemContent>
          </TreeItem>
        ))}
      </Tree>
    </div>
  )
}
