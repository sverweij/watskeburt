/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChildProcess, spawn } from "node:child_process";

function stringifyOutStream(pBufferOrString: Buffer | string): string {
  if (pBufferOrString instanceof Buffer) {
    return pBufferOrString.toString("utf8");
  } else {
    return pBufferOrString;
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
  pSpawnFunction: typeof spawn
): Promise<string> {
  const lGit: ChildProcess = pSpawnFunction("git", pArguments, {
    cwd: process.cwd(),
    // eslint-disable-next-line node/no-process-env
    env: process.env,
  });
  let lStdOutData = "";
  let lStdErrorData = "";

  return new Promise((pResolve, pReject) => {
    lGit.stdout?.on("data", (pData) => {
      lStdOutData = lStdOutData.concat(pData);
    });

    lGit.stderr?.on("data", (pData) => {
      lStdErrorData = lStdErrorData.concat(pData);
    });

    lGit.on("close", (pCode) => {
      if (pCode === 0) {
        pResolve(stringifyOutStream(lStdOutData));
      } else {
        pReject(
          new Error(
            pErrorMap[pCode ?? 0] ||
              `internal git error: ${pCode} (${stringifyOutStream(
                lStdErrorData
              )})`
          )
        );
      }
    });

    lGit.on("error", (pError: any) => {
      if (pError?.code === "ENOENT") {
        pReject(new Error("git executable not found"));
      } else {
        pReject(new Error(`internal spawn error: ${pError}`));
      }
    });
  });
}

/**
 * @throws {Error}
 */
export async function getStatusShort(pSpawnFunction = spawn): Promise<string> {
  const lErrorMap: IErrorMapType = {
    129: `'${process.cwd()}' does not seem to be a git repository`,
  };
  const lResult = await getGitResult(
    ["status", "--porcelain"],
    lErrorMap,
    pSpawnFunction
  );
  return lResult;
}

/**
 *
 * @throws {Error}
 */
export async function getDiffLines(
  pOldRevision: string,
  pNewRevision?: string | undefined,
  pSpawnFunction = spawn
): Promise<string> {
  const lErrorMap: IErrorMapType = {
    128: `revision '${pOldRevision}' ${
      pNewRevision ? `(or '${pNewRevision}') ` : ""
    }unknown`,
    129: `'${process.cwd()}' does not seem to be a git repository`,
  };

  const lResult = await getGitResult(
    pNewRevision
      ? ["diff", pOldRevision, pNewRevision, "--name-status"]
      : ["diff", pOldRevision, "--name-status"],
    lErrorMap,
    pSpawnFunction
  );
  return lResult;
}

export async function getSHA(pSpawnFunction = spawn): Promise<string> {
  const lSha1Length = 40;

  const lResult = await getGitResult(["rev-parse", "HEAD"], {}, pSpawnFunction);
  return lResult.slice(0, lSha1Length);
}
