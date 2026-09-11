import {
  FileTsIcon,
  FolderIcon,
  FolderOpenIcon,
  ImageIcon,
} from "@phosphor-icons/react"

import {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemTrigger,
  TreeLeaf,
} from "@diametral/design-system/react"

export default function TreeFolderIcons() {
  return (
    <Tree className="max-w-xs">
      <TreeItem defaultOpen>
        <TreeItemTrigger>
          <FolderOpenIcon className="hidden group-data-panel-open/tree-item-trigger:block" />
          <FolderIcon className="group-data-panel-open/tree-item-trigger:hidden" />
          assets
        </TreeItemTrigger>
        <TreeItemContent>
          <TreeLeaf>
            <ImageIcon /> wordmark.svg
          </TreeLeaf>
          <TreeLeaf>
            <FileTsIcon /> index.ts
          </TreeLeaf>
        </TreeItemContent>
      </TreeItem>
      <TreeItem>
        <TreeItemTrigger>
          <FolderOpenIcon className="hidden group-data-panel-open/tree-item-trigger:block" />
          <FolderIcon className="group-data-panel-open/tree-item-trigger:hidden" />
          styles
        </TreeItemTrigger>
        <TreeItemContent>
          <TreeLeaf>
            <FileTsIcon /> globals.css
          </TreeLeaf>
        </TreeItemContent>
      </TreeItem>
    </Tree>
  )
}
