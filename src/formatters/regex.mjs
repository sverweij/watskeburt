import { extname } from "node:path";

/**
 *
 * @param {import('../types/diff-dat').IChange[]} pChanges
 * @param {string[]} pExtensions
 * @param {import('../types/diff-dat').changeTypeType[]} pChangeTypes
 * @return {string}
 */
export default function formatToRegex(
  pChanges,
  pExtensions = [".js", ".ts", ".mjs", ".cjs"],
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
