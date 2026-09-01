import { cx } from "../lib/cx.js";
/* ----------------------------------------------------------------------------
   File upload / dropzone — a clickable, keyboard-accessible .ds-dropzone wrapping
   a hidden <input type=file>. Drag-and-drop handlers toggle .is-dragover on the
   zone; selected files render in a .ds-filelist with a name, a formatted size and
   a remove × button. Calls onFiles(File[]) whenever the selection changes. Works
   controlled (value: File[]) or uncontrolled (internal state).
   Styling: css/components/file-upload.css.
   ---------------------------------------------------------------------------- */
import React from "react";

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

const h = React.createElement;

/* Human-readable byte size with a tabular-friendly figure. */
function formatSize(bytes: any) {
  if (bytes == null || Number.isNaN(bytes)) return "";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let n = bytes / 1024;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  return `${n < 10 ? n.toFixed(1) : Math.round(n)} ${units[i]}`;
}

export function FileUpload({
  accept,
  multiple = false,
  onFiles,
  value,
  hint,
  disabled,
  name,
  className,
  ...rest
}: FileUploadProps) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState<any[]>([]);
  const files = controlled ? value || [] : internal;

  const [dragover, setDragover] = React.useState(false);
  const inputRef = React.useRef<any>(null);
  const dragDepth = React.useRef(0);

  const commit = (next: any) => {
    if (!controlled) setInternal(next);
    if (onFiles) onFiles(next);
  };

  const addFiles = (list: any) => {
    if (disabled) return;
    const incoming = Array.from(list || []);
    if (!incoming.length) return;
    commit(multiple ? files.concat(incoming) : incoming.slice(0, 1));
  };

  const removeAt = (idx: any) => {
    if (disabled) return;
    commit(files.filter((_, i) => i !== idx));
  };

  const openPicker = () => {
    if (disabled) return;
    if (inputRef.current) inputRef.current.click();
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    dragDepth.current = 0;
    setDragover(false);
    if (disabled) return;
    if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
  };
  const onDragEnter = (e: any) => {
    e.preventDefault();
    if (disabled) return;
    dragDepth.current += 1;
    setDragover(true);
  };
  const onDragLeave = (e: any) => {
    e.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragover(false);
  };

  return h("div", { className: cx("ds-file-upload", className), ...rest },
    h("div", {
      className: cx("ds-dropzone", dragover && "is-dragover"),
      role: "button",
      tabIndex: disabled ? -1 : 0,
      "aria-disabled": disabled || undefined,
      onClick: openPicker,
      onKeyDown: (e: any) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); }
      },
      onDrop,
      onDragOver,
      onDragEnter,
      onDragLeave,
    },
      h("input", {
        ref: inputRef,
        type: "file",
        accept,
        multiple,
        name,
        disabled: disabled || undefined,
        hidden: true,
        style: { display: "none" },
        onChange: (e: any) => {
          addFiles(e.target.files);
          e.target.value = ""; // allow re-selecting the same file
        },
      }),
      h("div", { className: "ds-dropzone__hint" },
        hint != null
          ? hint
          : h(React.Fragment, null,
              h("strong", null, "Click to upload"),
              " or drag and drop"
            )
      )
    ),
    files.length
      ? h("ul", { className: "ds-filelist" },
          files.map((file, i) =>
            h("li", { key: `${file.name}-${i}`, className: "ds-filelist__item" },
              h("span", { className: "ds-filelist__name", title: file.name }, file.name),
              h("span", { className: "ds-filelist__size" }, formatSize(file.size)),
              h("button", {
                type: "button",
                className: "ds-filelist__remove",
                "aria-label": `Remove ${file.name}`,
                disabled: disabled || undefined,
                onClick: (e: any) => { e.stopPropagation(); removeAt(i); },
              }, "×")
            )
          )
        )
      : null
  );
}
