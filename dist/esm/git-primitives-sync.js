import { spawnSync } from "node:child_process";
export function getStatusShortSync(pSpawnFunction = spawnSync) {
    const lErrorMap = {
        129: `'${process.cwd()}' does not seem to be a git repository`,
    };
    return getGitResultSync(["status", "--porcelain"], lErrorMap, pSpawnFunction);
}
export function getDiffLinesSync(pOldRevision, pNewRevision, pSpawnFunction = spawnSync) {
    const lErrorMap = {
        128: `revision '${pOldRevision}' ${pNewRevision ? `(or '${pNewRevision}') ` : ""}unknown`,
        129: `'${process.cwd()}' does not seem to be a git repository`,
    };
    return getGitResultSync(pNewRevision
        ? ["diff", pOldRevision, pNewRevision, "--name-status"]
        : ["diff", pOldRevision, "--name-status"], lErrorMap, pSpawnFunction);
}
export function getSHASync(pSpawnFunction = spawnSync) {
    const lSha1Length = 40;
    return getGitResultSync(["rev-parse", "HEAD"], {}, pSpawnFunction).slice(0, lSha1Length);
}
function getGitResultSync(pArguments, pErrorMap, pSpawnFunction) {
    const lGitResult = pSpawnFunction("git", pArguments, {
        cwd: process.cwd(),
        env: process.env,
    });
    if (lGitResult.error) {
        throwSpawnError(lGitResult.error);
    }
    if (lGitResult.status === 0) {
        return stringifyOutStream(lGitResult.stdout);
    }
    else {
        throw new Error(pErrorMap[lGitResult.status ?? 0] ||
            `internal git error: ${lGitResult.status} (${stringifyOutStream(lGitResult.stderr)})`);
    }
}
function stringifyOutStream(pError) {
    if (pError instanceof Buffer) {
        return pError.toString("utf8");
    }
    else {
        return pError;
    }
}
function throwSpawnError(pError) {
    if (pError.code === "ENOENT") {
        throw new Error("git executable not found");
    }
    else {
        throw new Error(`internal spawn error: ${pError}`);
    }
}
