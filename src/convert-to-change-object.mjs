import { EOL } from "node:os";
const DIFF_NAME_STATUS_LINE_PATTERN = new RegExp(
  "^(?<changeType>[ACDMRTUXB])(?<similarity>[0-9]{3})?[ \t]+(?<name>[^ \t]+)[ \t]*(?<newName>[^ \t]+)?$"
);
const CHANGE_CHAR_2_CHANGE_TYPE = {
  A: "added",
  C: "copied",
  D: "deleted",
  M: "modified",
  R: "renamed",
  T: "type changed",
  U: "unmerged",
  B: "pairing broken",
  // X: "unknown"
};

function changeChar2ChangeType(pChar) {
  return CHANGE_CHAR_2_CHANGE_TYPE[pChar] || "unknown";
}

/**
 *
 * @param {string} pString
 * @returns {import('../types/diff-dat').IChange}
 */
export function convertLine(pString) {
  const lMatchResult = pString.match(DIFF_NAME_STATUS_LINE_PATTERN);
  let lReturnValue = {};

  if (lMatchResult) {
    lReturnValue.changeType = changeChar2ChangeType(
      lMatchResult.groups.changeType
    );
    if (lMatchResult.groups.similarity) {
      lReturnValue.similarity = Number.parseInt(
        lMatchResult.groups.similarity,
        10
      );
    }
    if (lMatchResult.groups.newName) {
      lReturnValue.name = lMatchResult.groups.newName;
      lReturnValue.oldName = lMatchResult.groups.name;
    } else {
      lReturnValue.name = lMatchResult.groups.name;
    }
  }
  return lReturnValue;
}

/**
 *
 * @param {string} pString
 * @returns {import('../types/diff-dat').IChange[]}
 */
export function convertLines(pString) {
  return pString.split(EOL).filter(Boolean).map(convertLine);
}
