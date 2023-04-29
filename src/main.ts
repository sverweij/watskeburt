import type { IChange, IOptions } from "../types/watskeburt.js";
import {
  convertDiffLines,
  convertStatusLines,
} from "./convert-to-change-object.js";
import * as primitivesSync from "./git-primitives-sync.js";
import * as primitives from "./git-primitives.js";
import format from "./formatters/format.js";

export async function list(
  pOldRevision?: string,
  pNewRevision?: string,
  pOptions?: IOptions
): Promise<IChange[] | string> {
  const lOldRevision: string = pOldRevision || (await primitives.getSHA());
  const lOptions: IOptions = pOptions || {};

  const [lDiffLines, lStatusLines] = await Promise.all([
    primitives.getDiffLines(lOldRevision, pNewRevision),
    // to stay consistent with the use of trackedOnly below: negated condition
    // eslint-disable-next-line no-negated-condition
    !lOptions.trackedOnly ? primitives.getStatusShort() : "",
  ]);

  let lChanges = convertDiffLines(lDiffLines);

  if (!lOptions.trackedOnly) {
    lChanges = lChanges.concat(
      convertStatusLines(lStatusLines).filter(
        ({ changeType }) => changeType === "untracked"
      )
    );
  }
  return format(lChanges, lOptions.outputType);
}

export function listSync(
  pOldRevision?: string,
  pNewRevision?: string,
  pOptions?: IOptions
): IChange[] | string {
  const lOldRevision: string = pOldRevision || primitivesSync.getSHASync();
  const lOptions: IOptions = pOptions || {};

  let lChanges = convertDiffLines(
    primitivesSync.getDiffLinesSync(lOldRevision, pNewRevision)
  );

  if (!lOptions.trackedOnly) {
    lChanges = lChanges.concat(
      convertStatusLines(primitivesSync.getStatusShortSync()).filter(
        ({ changeType }) => changeType === "untracked"
      )
    );
  }
  return format(lChanges, lOptions.outputType);
}

// Although it looks like getSHA and getSHASync could be re-exported e.g.
//   export { getSHA } from "./git-primitives.js"
// the 'primitives' have a extra parameter we don't want to expose,
// so instead we wrap them:

export function getSHA(): Promise<string> {
  return primitives.getSHA();
}

export function getSHASync(): string {
  return primitivesSync.getSHASync();
}
