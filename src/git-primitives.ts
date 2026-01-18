/* eslint-disable @typescript-eslint/no-explicit-any, no-magic-numbers */
import { type ChildProcess, spawn } from "node:child_process";

type IErrorMapType = Map<number, string>;
const SHA1_LENGTH = 40;
const EMPTY_ERROR_MAP: IErrorMapType = new Map([]);

/**
 * @throws {Error}
 */
export async function getStatusShort(pSpawnFunction = spawn): Promise<string> {
  const lErrorMap: IErrorMapType = new Map([
    [129, `'${process.cwd()}' does not seem to be a git repository`],
  ]);
  const lStatusOutput = await getGitResult(
    ["status", "--porcelain"],
    lErrorMap,
    pSpawnFunction,
  );
  return lStatusOutput;
}

/**
 * @throws {Error}
 */
export async function getDiffLines(
  pOldRevision: string,
  pNewRevision?: string | undefined,
  pSpawnFunction = spawn,
): Promise<string> {
  // declaring this at load time sounds enticing, however at least one
  // of the error messages is dynamic.
  const lErrorMap: IErrorMapType = new Map([
    [
      128,
      `revision '${pOldRevision}' ${
        pNewRevision ? `(or '${pNewRevision}') ` : ""
      }unknown`,
    ],
    [129, `'${process.cwd()}' does not seem to be a git repository`],
  ]);

  const lDiffOutput = await getGitResult(
    pNewRevision
      ? ["diff", pOldRevision, pNewRevision, "--name-status"]
      : ["diff", pOldRevision, "--name-status"],
    lErrorMap,
    pSpawnFunction,
  );
  return lDiffOutput;
}

export async function getSHA(pSpawnFunction = spawn): Promise<string> {
  const lRevParseOutput = await getGitResult(
    ["rev-parse", "HEAD"],
    EMPTY_ERROR_MAP,
    pSpawnFunction,
  );
  return lRevParseOutput.slice(0, SHA1_LENGTH);
}

/**
 * @throws {Error}
 */
function getGitResult(
  pArguments: string[],
  pErrorMap: IErrorMapType,
  pSpawnFunction: typeof spawn,
): Promise<string> {
  const lGit: ChildProcess = pSpawnFunction("git", pArguments, {
    cwd: process.cwd(),
    // eslint-disable-next-line n/no-process-env
    env: process.env,
  });
  const lStdOutChunks: Array<string> = [];
  const lStdErrorChunks: Array<string> = [];

  return new Promise((pResolve, pReject) => {
    lGit.stdout?.on("data", (pData) => {
      lStdOutChunks.push(pData);
    });

    lGit.stderr?.on("data", (pData) => {
      lStdErrorChunks.push(pData);
    });

    lGit.on("close", (pCode) => {
      if (pCode === 0) {
        pResolve(lStdOutChunks.join(""));
      } else {
        pReject(
          new Error(
            pErrorMap.get(pCode ?? 0) ??
              `internal git error: ${pCode} (${lStdErrorChunks.join("")})`,
          ),
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
