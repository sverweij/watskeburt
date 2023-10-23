import { EOL } from "node:os";
import { changeChar2ChangeType } from "./map-change-type.js";
const DIFF_NAME_STATUS_LINE_PATTERN =
  /^(?<changeType>[ACDMRTUXB])(?<similarity>[0-9]{3})?[ \t]+(?<name>[^ \t]+)[ \t]*(?<newName>[^ \t]+)?$/;
export function parseDiffLines(pString) {
  return pString
    .split(EOL)
    .filter(Boolean)
    .map(parseDiffLine)
    .filter(({ name, changeType }) => Boolean(name) && Boolean(changeType));
}
export function parseDiffLine(pString) {
  const lMatchResult = pString.match(DIFF_NAME_STATUS_LINE_PATTERN);
  const lReturnValue = {};
  if (lMatchResult?.groups) {
    lReturnValue.changeType = changeChar2ChangeType(
      lMatchResult.groups.changeType,
    );
    if (lMatchResult.groups.newName) {
      lReturnValue.name = lMatchResult.groups.newName;
      lReturnValue.oldName = lMatchResult.groups.name;
    } else {
      lReturnValue.name = lMatchResult.groups.name;
    }
  }
  return lReturnValue;
}
