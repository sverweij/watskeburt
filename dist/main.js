import { parseDiffLines } from "./parse-diff-lines.js";
import { parseStatusLines } from "./parse-status-lines.js";
import * as primitives from "./git-primitives.js";
import format from "./formatters/format.js";
export async function list(pOptions) {
  const lOldRevision = pOptions?.oldRevision || (await primitives.getSHA());
  const lOptions = pOptions || {};
  const [lDiffLines, lStatusLines] = await Promise.all([
    primitives.getDiffLines(lOldRevision, pOptions?.newRevision),
    !lOptions.trackedOnly ? primitives.getStatusShort() : "",
  ]);
  let lChanges = parseDiffLines(lDiffLines);
  if (!lOptions.trackedOnly) {
    lChanges = lChanges.concat(
      parseStatusLines(lStatusLines).filter(
        ({ changeType }) => changeType === "untracked",
      ),
    );
  }
  return format(lChanges, lOptions.outputType);
}
export function getSHA() {
  return primitives.getSHA();
}
