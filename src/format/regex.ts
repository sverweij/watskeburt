import { extname } from "node:path";
import type { IChange, changeType } from "../../types/watskeburt.js";

const DEFAULT_CHANGE_TYPES: Set<changeType> = new Set([
  "modified",
  "added",
  "renamed",
  "copied",
  "untracked",
]);

export default function formatAsRegex(
  pChanges: IChange[],
  pExtensions: Set<string>,
  pChangeTypes: Set<changeType> = DEFAULT_CHANGE_TYPES,
): string {
  const lChanges = pChanges
    .filter(
      (pChange) =>
        pChangeTypes.has(pChange.type) &&
        (pExtensions.has(".*") || pExtensions.has(extname(pChange.name))),
    )
    .map(({ name }) => name.replace(/\\/g, "\\\\").replace(/\./g, "[.]"))
    .join("|");
  return `^(${lChanges})$`;
}
