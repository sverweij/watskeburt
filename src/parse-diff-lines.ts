// the security (and unicorn) plugins don't seem to detect named caption
// groups very well - false-flagging below regular expressions to be susceptible
// to redos  attacks.
/* eslint-disable security/detect-unsafe-regex */
import { EOL } from "node:os";
import type { IChange } from "../types/watskeburt.js";
import { mapChangeType } from "./map-change-type.js";

const DIFF_NAME_STATUS_LINE_PATTERN =
  /^(?<type>[ACDMRTUXB])(?<similarity>\d{3})?[ \t]+(?<name>[^ \t]+)[ \t]*(?<newName>[^ \t]+)?$/;

export function parseDiffLines(pString: string): IChange[] {
  return pString
    .split(EOL)
    .filter(Boolean)
    .map(parseDiffLine)
    .filter(({ name, type }) => Boolean(name) && Boolean(type)) as IChange[];
}

export function parseDiffLine(pString: string): Partial<IChange> {
  const lMatchResult = DIFF_NAME_STATUS_LINE_PATTERN.exec(pString);
  const lReturnValue: Partial<IChange> = {};

  if (lMatchResult?.groups) {
    lReturnValue.type = mapChangeType(lMatchResult.groups.type);
    if (lMatchResult.groups.newName) {
      lReturnValue.name = lMatchResult.groups.newName;
      lReturnValue.oldName = lMatchResult.groups.name;
    } else {
      lReturnValue.name = lMatchResult.groups.name;
    }
  }
  return lReturnValue;
}
