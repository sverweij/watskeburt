import { convertDiffLines, convertStatusLines, } from "./convert-to-change-object.js";
import * as primitives from "./git-primitives.js";
import format from "./formatters/format.js";
export async function list(pOldRevision, pNewRevision, pOptions) {
    const lOldRevision = pOldRevision || (await primitives.getSHA());
    const lOptions = pOptions || {};
    const [lDiffLines, lStatusLines] = await Promise.all([
        primitives.getDiffLines(lOldRevision, pNewRevision),
        !lOptions.trackedOnly ? primitives.getStatusShort() : "",
    ]);
    let lChanges = convertDiffLines(lDiffLines);
    if (!lOptions.trackedOnly) {
        lChanges = lChanges.concat(convertStatusLines(lStatusLines).filter(({ changeType }) => changeType === "untracked"));
    }
    return format(lChanges, lOptions.outputType);
}
export function getSHA() {
    return primitives.getSHA();
}