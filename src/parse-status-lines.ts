// the security (and unicorn) plugins don't seem to detect named caption
// groups very well - false-flagging below regular expressions to be susceptible
// to redos  attacks.
/* eslint-disable security/detect-unsafe-regex */
import { EOL } from "node:os";
import type { IChange } from "../types/watskeburt.js";
import { mapChangeType } from "./map-change-type.js";

const DIFF_SHORT_STATUS_LINE_PATTERN =
  /^(?<stagedType>[ ACDMRTUXB?!])(?<unStagedType>[ ACDMRTUXB?!])[ \t]+(?<name>[^ \t]+)(( -> )(?<newName>[^ \t]+))?$/;

export function parseStatusLines(pString: string): IChange[] {
  return pString
    .split(EOL)
    .filter(Boolean)
    .map(parseStatusLine)
    .filter(({ name, type }) => Boolean(name) && Boolean(type)) as IChange[];
}

export function parseStatusLine(pString: string): Partial<IChange> {
  const lMatchResult = pString.match(DIFF_SHORT_STATUS_LINE_PATTERN);
  const lReturnValue: Partial<IChange> = {};

  if (lMatchResult?.groups) {
    const lStagedType = mapChangeType(lMatchResult.groups.stagedType);
    const lUnStagedType = mapChangeType(lMatchResult.groups.unStagedType);

    lReturnValue.type =
      lStagedType === "unmodified" ? lUnStagedType : lStagedType;

    if (lMatchResult.groups.newName) {
      lReturnValue.name = lMatchResult.groups.newName;
      lReturnValue.oldName = lMatchResult.groups.name;
    } else {
      lReturnValue.name = lMatchResult.groups.name;
    }
  }
  return lReturnValue;
}
