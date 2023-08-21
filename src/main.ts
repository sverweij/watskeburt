import type { IChange, IOptions } from "../types/watskeburt.js";
import { parseDiffLines } from "./parse-diff-lines.js";
import { parseStatusLines } from "./parse-status-lines.js";
import * as primitives from "./git-primitives.js";
import format from "./formatters/format.js";

export async function list(
  pOldRevision?: string,
  pNewRevision?: string,
  pOptions?: IOptions,
): Promise<IChange[] | string> {
  const lOldRevision: string = pOldRevision || (await primitives.getSHA());
  const lOptions: IOptions = pOptions || {};

  const [lDiffLines, lStatusLines] = await Promise.all([
    primitives.getDiffLines(lOldRevision, pNewRevision),
    // to stay consistent with the use of trackedOnly below: negated condition
    // eslint-disable-next-line no-negated-condition
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

// Although it looks like getSHA could be re-exported e.g.
//   export { getSHA } from "./git-primitives.js"
// the 'primitives' has an extra parameter we don't want to expose,
// so instead we wrap them:

export function getSHA(): Promise<string> {
  return primitives.getSHA();
}
