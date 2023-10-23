import { EOL } from "node:os";
import { changeChar2ChangeType } from "./map-change-type.js";
const DIFF_SHORT_STATUS_LINE_PATTERN =
  /^(?<stagedChangeType>[ ACDMRTUXB?!])(?<unStagedChangeType>[ ACDMRTUXB?!])[ \t]+(?<name>[^ \t]+)(( -> )(?<newName>[^ \t]+))?$/;
export function parseStatusLines(pString) {
  return pString
    .split(EOL)
    .filter(Boolean)
    .map(parseStatusLine)
    .filter(({ name, changeType }) => Boolean(name) && Boolean(changeType));
}
export function parseStatusLine(pString) {
  const lMatchResult = pString.match(DIFF_SHORT_STATUS_LINE_PATTERN);
  const lReturnValue = {};
  if (lMatchResult?.groups) {
    const lStagedChangeType = changeChar2ChangeType(
      lMatchResult.groups.stagedChangeType,
    );
    const lUnStagedChangeType = changeChar2ChangeType(
      lMatchResult.groups.unStagedChangeType,
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
