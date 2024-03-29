import { extname } from "node:path";
import type { IChange, changeType } from "../../types/watskeburt.js";

const DEFAULT_EXTENSIONS = new Set([
  ".cjs",
  ".cjsx",
  ".coffee",
  ".csx",
  ".cts",
  ".js",
  ".json",
  ".jsx",
  ".litcoffee",
  ".ls",
  ".mjs",
  ".mts",
  ".svelte",
  ".ts",
  ".tsx",
  ".vue",
  ".vuex",
]);

const DEFAULT_CHANGE_TYPES: Set<changeType> = new Set([
  "modified",
  "added",
  "renamed",
  "copied",
  "untracked",
]);

export default function formatAsRegex(
  pChanges: IChange[],
  pExtensions: Set<string> = DEFAULT_EXTENSIONS,
  pChangeTypes: Set<changeType> = DEFAULT_CHANGE_TYPES,
): string {
  const lChanges = pChanges
    .filter(
      (pChange) =>
        pChangeTypes.has(pChange.type) &&
        pExtensions.has(extname(pChange.name)),
    )
    .map(({ name }) => name.replace(/\\/g, "\\\\").replace(/\./g, "[.]"))
    .join("|");
  return `^(${lChanges})$`;
}
