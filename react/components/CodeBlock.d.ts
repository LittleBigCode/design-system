import type { HTMLAttributes } from "react";

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** The code to display. Rendered as text content — never as HTML. */
  code?: string;
  /** Optional language label (shown when no filename is given; also `data-language`). */
  language?: string;
  /** Optional filename shown on the left of the head bar. */
  filename?: string;
}

export declare function CodeBlock(props: CodeBlockProps): JSX.Element;
