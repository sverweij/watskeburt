import type { changeTypeType } from "../types/watskeburt.js";

const CHANGE_CHAR_2_CHANGE_TYPE: Map<string, changeTypeType> = new Map([
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
export function changeChar2ChangeType(pChar: string): changeTypeType {
  return CHANGE_CHAR_2_CHANGE_TYPE.get(pChar) ?? "unknown";
}
