import {
  convertDiffLines,
  convertStatusLines,
} from "./convert-to-change-object.mjs";
import { getDiffLines, getSHA1, getStatusShort } from "./git-primitives.mjs";
import format from "./formatters/format.mjs";

/** @type {import("../types/watskeburt.js").getSHA} */
export function getSHA() {
  return getSHA1();
}

/** @type {import("../types/watskeburt.js").list} */
export function list(pOldRevision, pOptions) {
  const lOldRevision = pOldRevision || getSHA();
  let lChanges = convertDiffLines(getDiffLines(lOldRevision));
  const lOptions = pOptions || {};

  if (!lOptions.trackedOnly) {
    lChanges = lChanges.concat(
      convertStatusLines(getStatusShort()).filter(
        ({ changeType }) => changeType === "untracked"
      )
    );
  }
  return format(lChanges, lOptions.outputType);
}
