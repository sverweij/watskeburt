/* eslint-disable no-magic-numbers */
import { spawnSync, SpawnSyncReturns } from "node:child_process";

type IErrorMapType = Map<number, string>;

/**
 * @throws {Error}
 */
export function getStatusShortSync(pSpawnFunction = spawnSync): string {
  const lErrorMap: IErrorMapType = new Map([
    [129, `'${process.cwd()}' does not seem to be a git repository`],
  ]);
  return getGitResultSync(["status", "--porcelain"], lErrorMap, pSpawnFunction);
}

/**
 *
 * @throws {Error}
 */
export function getDiffLinesSync(
  pOldRevision: string,
  pNewRevision?: string | undefined,
  pSpawnFunction = spawnSync
): string {
  const lErrorMap: IErrorMapType = new Map([
    [
      128,
      `revision '${pOldRevision}' ${
        pNewRevision ? `(or '${pNewRevision}') ` : ""
      }unknown`,
    ],
    [129, `'${process.cwd()}' does not seem to be a git repository`],
  ]);

  return getGitResultSync(
    pNewRevision
      ? ["diff", pOldRevision, pNewRevision, "--name-status"]
      : ["diff", pOldRevision, "--name-status"],
    lErrorMap,
    pSpawnFunction
  );
}

export function getSHASync(pSpawnFunction = spawnSync): string {
  const lSha1Length = 40;

  return getGitResultSync(
    ["rev-parse", "HEAD"],
    new Map(),
    pSpawnFunction
  ).slice(0, lSha1Length);
}

/**
 * @throws {Error}
 */
function getGitResultSync(
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
      pErrorMap.get(lGitResult.status ?? 0) ||
        `internal git error: ${lGitResult.status} (${stringifyOutStream(
          lGitResult.stderr
        )})`
    );
  }
}

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
