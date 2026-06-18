import type { HTMLAttributes, ReactNode } from "react";

export interface FileUploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Comma-separated list of accepted file types (forwarded to the input). */
  accept?: string;
  /** Allow selecting more than one file. Defaults to false. */
  multiple?: boolean;
  /** Fires whenever the selection changes, with the current files. */
  onFiles?: (files: File[]) => void;
  /** Controlled list of selected files. Omit for uncontrolled state. */
  value?: File[];
  /** Custom dropzone hint content. Defaults to a click / drag prompt. */
  hint?: ReactNode;
  /** Disable the control. */
  disabled?: boolean;
  /** Name forwarded to the underlying file input. */
  name?: string;
}

export declare function FileUpload(props: FileUploadProps): JSX.Element;
