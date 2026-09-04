/* The class-name joiner every component uses. It was copy-pasted into all 65
   modules; one definition removes 64 duplicates and gives it a type. */
export type ClassValue = string | false | null | undefined;

export function cx(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(" ");
}
