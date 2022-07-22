import { extname } from "node:path";

/**
 *
 * @param {import('../types/watskeburt').IChange[]} pChanges
 * @param {string[]} pExtensions
 * @param {import('../types/watskeburt').changeTypeType[]} pChangeTypes
 * @return {string}
 */
export default function formatToRegex(
  pChanges,
  pExtensions = [
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
  ],
  pChangeTypes = ["modified", "added", "renamed", "copied", "untracked"]
) {
  const lChanges = pChanges
    .filter((pChange) => pChangeTypes.includes(pChange.changeType))
    .map(({ name }) => name)
    .filter((pName) => pExtensions.includes(extname(pName)))
    // .replace(/\./g, "\\\\.")
    .join("|");
  return `^(${lChanges})$`;
}
