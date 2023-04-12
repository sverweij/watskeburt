import type { IChange, IOptions } from "../types/watskeburt.js";
import {
  convertDiffLines,
  convertStatusLines,
} from "./convert-to-change-object.js";
import {
  getDiffLinesSync,
  getSHASync,
  getStatusShortSync,
} from "./git-primitives.js";
import format from "./formatters/format.js";

export function listSync(
  pOldRevision?: string,
  pNewRevision?: string,
  pOptions?: IOptions
): IChange[] | string {
  const lOldRevision: string = pOldRevision || getSHASync();
  const lOptions: IOptions = pOptions || {};

  let lChanges = convertDiffLines(getDiffLinesSync(lOldRevision, pNewRevision));

  if (!lOptions.trackedOnly) {
    lChanges = lChanges.concat(
      convertStatusLines(getStatusShortSync()).filter(
        ({ changeType }) => changeType === "untracked"
      )
    );
  }
  return format(lChanges, lOptions.outputType);
}

export { getSHASync } from "./git-primitives.js";
