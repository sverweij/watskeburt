import type { IChange, IOptions } from "../types/watskeburt.js";
import {
  convertDiffLines,
  convertStatusLines,
} from "./convert-to-change-object.js";
import {
  getDiffLinesSync,
  getSHASync,
  getStatusShortSync,
} from "./git-primitives-sync.js";
import format from "./formatters/format.js";
import { getDiffLines, getStatusShort, getSHA } from "./git-primitives.js";

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

export async function list(
  pOldRevision?: string,
  pNewRevision?: string,
  pOptions?: IOptions
): Promise<IChange[] | string> {
  const lOldRevision: string = pOldRevision || (await getSHA());
  const lOptions: IOptions = pOptions || {};

  const [lDiffLines, lStatusLines] = await Promise.all([
    getDiffLines(lOldRevision, pNewRevision),
    lOptions.trackedOnly ? "" : getStatusShort(),
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

export { getSHASync } from "./git-primitives-sync.js";
export { getSHA } from "./git-primitives.js";
