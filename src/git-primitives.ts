import { spawnSync, SpawnSyncReturns } from "node:child_process";

function stringifyOutStream(pError: Buffer | string): string {
  if (pError instanceof Buffer) {
    return pError.toString("utf8");
  } else {
    return pError;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throwSpawnError(pError: any) {
  if (pError.code === "ENOENT") {
    throw new Error("git executable not found");
  } else {
    throw new Error(`internal spawn error: ${pError}`);
  }
}

interface IErrorMapType {
  [index: number]: string;
}

/**
 * @throws {Error}
 */
function getGitResult(
  pArguments: string[],
  pErrorMap: IErrorMapType,
  pSpawnFunction: typeof spawnSync
): string {
  const lGitResult: SpawnSyncReturns<Buffer> = pSpawnFunction(
    "git",
    pArguments,
    {
      cwd: process.cwd(),
      // eslint-disable-next-line node/no-process-env
      env: process.env,
    }
  );

  if (lGitResult.error) {
    throwSpawnError(lGitResult.error);
  }

  if (lGitResult.status === 0) {
    return stringifyOutStream(lGitResult.stdout);
  } else {
    throw new Error(
      pErrorMap[lGitResult.status ?? 0] ||
        `internal git error: ${lGitResult.status} (${stringifyOutStream(
          lGitResult.stderr
        )})`
    );
  }
}

/**
 * @throws {Error}
 */
export function getStatusShort(pSpawnFunction = spawnSync): string {
  const lErrorMap: IErrorMapType = {
    129: `'${process.cwd()}' does not seem to be a git repository`,
  };
  return getGitResult(["status", "--porcelain"], lErrorMap, pSpawnFunction);
}

/**
 *
 * @throws {Error}
 */
export function getDiffLines(
  pOldRevision: string,
  pNewRevision?: string | undefined,
  pSpawnFunction = spawnSync
): string {
  const lErrorMap: IErrorMapType = {
    128: `revision '${pOldRevision}' ${
      pNewRevision ? `(or '${pNewRevision}') ` : ""
    }unknown`,
    129: `'${process.cwd()}' does not seem to be a git repository`,
  };

  return getGitResult(
    pNewRevision
      ? ["diff", pOldRevision, pNewRevision, "--name-status"]
      : ["diff", pOldRevision, "--name-status"],
    lErrorMap,
    pSpawnFunction
  );
}

export function getSHA1(pSpawnFunction = spawnSync): string {
  const lSha1Length = 40;

  return getGitResult(["rev-parse", "HEAD"], {}, pSpawnFunction).slice(
    0,
    lSha1Length
  );
}