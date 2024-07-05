import type { changeType } from "../types/watskeburt.js";

const CHANGE_TYPE_MAP: Map<string, changeType> = new Map([
  ["A", "added"],
  ["C", "copied"],
  ["D", "deleted"],
  ["M", "modified"],
  ["R", "renamed"],
  ["T", "type changed"],
  ["U", "unmerged"],
  ["B", "pairing broken"],
  [" ", "unmodified"],
  ["?", "untracked"],
  ["!", "ignored"],
  // ["X", "unknown"]
]);
export function mapChangeType(pChar: string): changeType {
  return CHANGE_TYPE_MAP.get(pChar) ?? "unknown";
}
