import {
  convertDiffLines,
  convertStatusLines,
} from "./convert-to-change-object.mjs";
import { getDiffLines, getSHA1, getStatusShort } from "./git-primitives.mjs";
import format from "./formatters/format.mjs";

/**
 *
 * returns a list of files changed since pOldThing. With pOptions
 * you can
 * - influence whether you want to have the output as an array of
 *   IChange-s or one of the other output formats (outputType)
 * - tell whether you want to take untracked files into account as
 *   well (by setting trackedOnly to false)
 *
 * @param {string} pOldRevision reference to a commit, branch, tag, ...
 * @param {import("../types/watskeburt.js").IOptions} pOptions
 * @throws {Error}
 * @returns {string|import("../types/watskeburt.js").IChange[]}
 */
export function list(pOldRevision, pOptions) {
  let lChanges = convertDiffLines(getDiffLines(pOldRevision));
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
/**
 * Returns the SHA1 of the current HEAD
 *
 * @returns {string}
 */
export function getSHA() {
  return getSHA1();
}
