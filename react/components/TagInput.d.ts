import type {
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface TagInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled list of tokens. */
  value?: string[];
  /** Uncontrolled initial list of tokens. */
  defaultValue?: string[];
  /** Called with the next list whenever a token is added or removed. */
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export declare const TagInput: ForwardRefExoticComponent<
  TagInputProps & RefAttributes<HTMLInputElement>
>;
