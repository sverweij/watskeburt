import { EOL } from "node:os";
const DIFF_NAME_STATUS_LINE_PATTERN = new RegExp(
  "^(?<changeType>[ACDMRTUXB])(?<similarity>[0-9]{3})?[ \t]+(?<name>[^ \t]+)[ \t]*(?<newName>[^ \t]+)?$"
);
const DIFF_SHORT_STATUS_LINE_PATTERN = new RegExp(
  "^(?<stagedChangeType>[ ACDMRTUXB?!])(?<unStagedChangeType>[ ACDMRTUXB?!])[ \t]+(?<name>[^ \t]+)(( -> )(?<newName>[^ \t]+))?$"
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
  " ": "unmodified",
  "?": "untracked",
  "!": "ignored",
  // X: "unknown"
};

function changeChar2ChangeType(pChar) {
  return CHANGE_CHAR_2_CHANGE_TYPE[pChar] || "unknown";
}

/**
 *
 * @param {string} pString
 * @returns {import('../types/watskeburt').IChange}
 */
export function convertStatusLine(pString) {
  const lMatchResult = pString.match(DIFF_SHORT_STATUS_LINE_PATTERN);
  /**  @type {import('../types/watskeburt').IChange} */
  let lReturnValue = {};

  if (lMatchResult) {
    const lStagedChangeType = changeChar2ChangeType(
      lMatchResult.groups.stagedChangeType
    );
    const lUnStagedChangeType = changeChar2ChangeType(
      lMatchResult.groups.unStagedChangeType
    );

    lReturnValue.changeType =
      lStagedChangeType === "unmodified"
        ? lUnStagedChangeType
        : lStagedChangeType;

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
 * @returns {import('../types/watskeburt').IChange}
 */
export function convertDiffLine(pString) {
  const lMatchResult = pString.match(DIFF_NAME_STATUS_LINE_PATTERN);
  /**  @type {import('../types/watskeburt').IChange} */
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
 * @returns {import('../types/watskeburt').IChange[]}
 */
export function convertStatusLines(pString) {
  return pString
    .split(EOL)
    .filter(Boolean)
    .map(convertStatusLine)
    .filter(({ changeType }) => Boolean(changeType));
}

/**
 *
 * @param {string} pString
 * @returns {import('../types/watskeburt').IChange[]}
 */
export function convertDiffLines(pString) {
  return pString
    .split(EOL)
    .filter(Boolean)
    .map(convertDiffLine)
    .filter(({ changeType }) => Boolean(changeType));
}
