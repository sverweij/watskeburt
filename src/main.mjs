import {
  convertDiffLines,
  convertStatusLines,
} from "./convert-to-change-object.mjs";
import { getDiffLines, getStatusShort } from "./get-diff-lines.mjs";
import format from "./formatters/format.mjs";

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
