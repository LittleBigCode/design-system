import { FileTsIcon, FolderIcon } from "@phosphor-icons/react"

import {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemTrigger,
  TreeLeaf,
} from "@diametral/design-system/react"

export default function TreeNested() {
  return (
    <Tree className="max-w-xs">
      <TreeItem defaultOpen>
        <TreeItemTrigger>
          <FolderIcon /> packages
        </TreeItemTrigger>
        <TreeItemContent>
          <TreeItem defaultOpen>
            <TreeItemTrigger>
              <FolderIcon /> ui
            </TreeItemTrigger>
            <TreeItemContent>
              <TreeItem>
                <TreeItemTrigger>
                  <FolderIcon /> components
                </TreeItemTrigger>
                <TreeItemContent>
                  <TreeLeaf>
                    <FileTsIcon /> tree.tsx
                  </TreeLeaf>
                </TreeItemContent>
              </TreeItem>
              <TreeLeaf>
                <FileTsIcon /> index.ts
              </TreeLeaf>
            </TreeItemContent>
          </TreeItem>
          <TreeItem>
            <TreeItemTrigger>
              <FolderIcon /> eslint-config
            </TreeItemTrigger>
            <TreeItemContent>
              <TreeLeaf>
                <FileTsIcon /> base.js
              </TreeLeaf>
            </TreeItemContent>
          </TreeItem>
        </TreeItemContent>
      </TreeItem>
    </Tree>
  )
}
