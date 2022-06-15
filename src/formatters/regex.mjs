import { extname } from "node:path";

/**
 *
 * @param {import('../types/diff-dat').IChange[]} pChanges
 * @return {string}
 */
export default function formatToRegex(pChanges) {
  const lChanges = pChanges
    .filter((pChange) =>
      ["modified", "added", "renamed", "copied"].includes(pChange.changeType)
    )
    .map(
      ({ name }) => name //.replace(/\./g, "\\\\.")
    )
    .filter((pName) => [".js", ".ts", ".mjs", ".cjs"].includes(extname(pName)))
    .join("|");
  return `^(${lChanges})$`;
}
