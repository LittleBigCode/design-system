import type { HTMLAttributes, ReactNode } from "react";

export interface TreeNode {
  id: string;
  label: ReactNode;
  children?: TreeNode[];
}

export interface TreeProps extends HTMLAttributes<HTMLUListElement> {
  /** The root nodes to render. */
  nodes: TreeNode[];
  /** Node ids expanded initially (expansion is uncontrolled). */
  defaultExpanded?: string[];
  /** Fires with the node when a label is chosen. */
  onSelect?: (node: TreeNode) => void;
}
export declare function Tree(props: TreeProps): JSX.Element;
