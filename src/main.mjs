import {
  convertDiffLines,
  convertStatusLines,
} from "./convert-to-change-object.mjs";
import { getDiffLines, getSHA1, getStatusShort } from "./git-primitives.mjs";
import format from "./formatters/format.mjs";

/** @type {import("../types/watskeburt").getSHASync} */
export function getSHASync() {
  return getSHA1();
}

/** @type {import("../types/watskeburt").listSync} */
export function listSync(pOldRevision, pNewRevision, pOptions) {
  const lOldRevision = pOldRevision || getSHA1();
  const lNewRevision = pNewRevision || null;
  const lOptions = pOptions || {};

  let lChanges = convertDiffLines(getDiffLines(lOldRevision, lNewRevision));

  if (!lOptions.trackedOnly) {
    lChanges = lChanges.concat(
      convertStatusLines(getStatusShort()).filter(
        ({ changeType }) => changeType === "untracked"
      )
    );
  }
  return format(lChanges, lOptions.outputType);
}
