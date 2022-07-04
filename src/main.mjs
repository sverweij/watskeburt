import {
  convertDiffLines,
  convertStatusLines,
} from "./convert-to-change-object.mjs";
import { getDiffLines, getStatusShort } from "./get-diff-lines.mjs";
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
 * @param {string} pOldThing reference to a commit, branch, tag, ...
 * @param {import("../types/diff-dat.js").IOptions} pOptions
 * @returns {string|import("../types/diff-dat.js").IChange[]}
 */
export function convert(pOldThing, pOptions) {
  let lChanges = convertDiffLines(getDiffLines(pOldThing));

  if (!pOptions.trackedOnly) {
    lChanges = lChanges.concat(
      convertStatusLines(getStatusShort()).filter(
        ({ changeType }) => changeType === "untracked"
      )
    );
  }
  return format(lChanges, pOptions.outputType);
}
