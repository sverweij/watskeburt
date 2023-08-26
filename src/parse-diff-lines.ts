// the security (and unicorn) plugins don't seem to detect named caption
// groups very well - false-flagging below regular expressions to be susceptible
// to redos  attacks.
/* eslint-disable security/detect-unsafe-regex */
import { EOL } from "node:os";
import type { IChange } from "../types/watskeburt.js";
import { changeChar2ChangeType } from "./map-change-type.js";

const DIFF_NAME_STATUS_LINE_PATTERN =
  /^(?<changeType>[ACDMRTUXB])(?<similarity>[0-9]{3})?[ \t]+(?<name>[^ \t]+)[ \t]*(?<newName>[^ \t]+)?$/;

export function parseDiffLines(pString: string): IChange[] {
  return pString
    .split(EOL)
    .filter(Boolean)
    .map(parseDiffLine)
    .filter(
      ({ name, changeType }) => Boolean(name) && Boolean(changeType),
    ) as IChange[];
}

export function parseDiffLine(pString: string): Partial<IChange> {
  const lMatchResult = pString.match(DIFF_NAME_STATUS_LINE_PATTERN);
  const lReturnValue: Partial<IChange> = {};

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