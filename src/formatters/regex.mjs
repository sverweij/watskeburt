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
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".ts",
    ".tsx",
    ".vue",
    ".vuex",
    ".json",
  ],
  pChangeTypes = ["modified", "added", "renamed", "copied", "untracked"]
) {
  const lChanges = pChanges
    .filter((pChange) => pChangeTypes.includes(pChange.changeType))
    .map(
      ({ name }) => name //.replace(/\./g, "\\\\.")
    )
    .filter((pName) => pExtensions.includes(extname(pName)))
    .join("|");
  return `^(${lChanges})$`;
}
