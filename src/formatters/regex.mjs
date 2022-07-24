import { extname } from "node:path";

const DEFAULT_EXTENSIONS = new Set([
  ".cjs",
  ".cjsx",
  ".coffee",
  ".csx",
  ".js",
  ".json",
  ".jsx",
  ".litcoffee",
  ".ls",
  ".mjs",
  ".svelte",
  ".ts",
  ".tsx",
  ".vue",
  ".vuex",
]);

const DEFAULT_CHANGE_TYPES = new Set([
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
  pChanges,
  pExtensions = DEFAULT_EXTENSIONS,
  pChangeTypes = DEFAULT_CHANGE_TYPES
) {
  const lChanges = pChanges
    .filter((pChange) => pChangeTypes.has(pChange.changeType))
    .map(({ name }) => name)
    .filter((pName) => pExtensions.has(extname(pName)))
    // .replace(/\./g, "\\\\.")
    .join("|");
  return `^(${lChanges})$`;
}
