import { extname } from "node:path";
import { IChange, changeTypeType } from "../../types/watskeburt";

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

const DEFAULT_CHANGE_TYPES: Set<changeTypeType> = new Set([
  "modified",
  "added",
  "renamed",
  "copied",
  "untracked",
]);
/**
 *
 * @param {import('../types/watskeburt').IChange[]} pChanges
 * @param {Set<string>} pExtensions
 * @param {Set<import('../types/watskeburt').changeTypeType>} pChangeTypes
 * @return {string}
 */
export default function formatToRegex(
  pChanges: IChange[],
  pExtensions: Set<string> = DEFAULT_EXTENSIONS,
  pChangeTypes: Set<changeTypeType> = DEFAULT_CHANGE_TYPES
): string {
  const lChanges = pChanges
    .filter((pChange) => pChangeTypes.has(pChange.changeType))
    .map(({ name }) => name)
    .filter((pName) => pExtensions.has(extname(pName)))
    // .replace(/\./g, "\\\\.")
    .join("|");
  return `^(${lChanges})$`;
}
