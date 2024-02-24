// the security (and unicorn) plugins don't seem to detect named caption
// groups very well - false-flagging below regular expressions to be susceptible
// to redos  attacks.
/* eslint-disable security/detect-unsafe-regex */
import { EOL } from "node:os";
import type { IChange } from "../types/watskeburt.js";
import { changeChar2ChangeType } from "./map-change-type.js";

const DIFF_SHORT_STATUS_LINE_PATTERN =
  /^(?<stagedChangeType>[ ACDMRTUXB?!])(?<unStagedChangeType>[ ACDMRTUXB?!])[ \t]+(?<name>[^ \t]+)(( -> )(?<newName>[^ \t]+))?$/;

export function parseStatusLines(pString: string): IChange[] {
  return pString
    .split(EOL)
    .filter(Boolean)
    .map(parseStatusLine)
    .filter(
      ({ name, type: changeType }) => Boolean(name) && Boolean(changeType),
    ) as IChange[];
}

export function parseStatusLine(pString: string): Partial<IChange> {
  const lMatchResult = pString.match(DIFF_SHORT_STATUS_LINE_PATTERN);
  const lReturnValue: Partial<IChange> = {};

  if (lMatchResult?.groups) {
    const lStagedChangeType = changeChar2ChangeType(
      lMatchResult.groups.stagedChangeType,
    );
    const lUnStagedChangeType = changeChar2ChangeType(
      lMatchResult.groups.unStagedChangeType,
    );

    lReturnValue.type =
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
