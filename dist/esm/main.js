import { convertDiffLines, convertStatusLines, } from "./convert-to-change-object.js";
import { getDiffLines, getSHA1, getStatusShort } from "./git-primitives.js";
import format from "./formatters/format.js";
export function getSHASync() {
    return getSHA1();
}
export function listSync(pOldRevision, pNewRevision, pOptions) {
    const lOldRevision = pOldRevision || getSHA1();
    const lOptions = pOptions || {};
    let lChanges = convertDiffLines(getDiffLines(lOldRevision, pNewRevision));
    if (!lOptions.trackedOnly) {
        lChanges = lChanges.concat(convertStatusLines(getStatusShort()).filter(({ changeType }) => changeType === "untracked"));
    }
    return format(lChanges, lOptions.outputType);
}
