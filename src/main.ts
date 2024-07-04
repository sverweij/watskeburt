import type { IChange, IOptions } from "../types/watskeburt.js";
import { parseDiffLines } from "./parse-diff-lines.js";
import { parseStatusLines } from "./parse-status-lines.js";
import * as primitives from "./git-primitives.js";

export async function list(pOptions?: IOptions): Promise<IChange[] | string> {
  const lOldRevision: string =
    pOptions?.oldRevision || (await primitives.getSHA());
  const lOptions: IOptions = pOptions || {};

  const [lDiffLines, lStatusLines] = await Promise.all([
    primitives.getDiffLines(lOldRevision, pOptions?.newRevision),
    // to stay consistent with the use of trackedOnly below: negated condition
    // eslint-disable-next-line no-negated-condition
    !lOptions.trackedOnly ? primitives.getStatusShort() : "",
  ]);

  let lChanges = parseDiffLines(lDiffLines);

  if (!lOptions.trackedOnly) {
    lChanges = lChanges.concat(
      parseStatusLines(lStatusLines).filter(
        ({ type: changeType }) => changeType === "untracked",
      ),
    );
  }

  if (!lOptions.outputType) {
    return lChanges;
  }
  const { format } = await import("./format/format.js");
  return format(lChanges, lOptions.outputType, lOptions.extensions);
}

// Although it looks like getSHA could be re-exported e.g.
//   export { getSHA } from "./git-primitives.js"
// the 'primitives' has an extra parameter we don't want to expose,
// so instead we wrap them:
export function getSHA(): Promise<string> {
  return primitives.getSHA();
}
