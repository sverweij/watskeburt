import { spawnSync } from "node:child_process";

function stringifyOutStream(pError) {
  if (pError instanceof Buffer) {
    return pError.toString("utf8");
  } else {
    return pError;
  }
}

function throwSpawnError(pError) {
  if (pError.code === "ENOENT") {
    throw new Error("git executable not found");
  } else {
    throw new Error(`internal spawn error: ${pError}`);
  }
}

/**
 *
 * @param {string[]} pArguments
 * @return {string}
 * @throws {Error}
 */
function getGitResult(pArguments, pErrorMap, pSpawnFunction) {
  const lGitResult = pSpawnFunction("git", pArguments, {
    cwd: process.cwd(),
    env: process.env,
  });

  if (lGitResult.error) {
    throwSpawnError(lGitResult.error);
  }

  if (lGitResult.status === 0) {
    return stringifyOutStream(lGitResult.stdout);
  } else {
    throw new Error(
      pErrorMap[lGitResult.status] ||
        `internal git error: ${lGitResult.status} (${stringifyOutStream(
          lGitResult.stderr
        )})`
    );
  }
}

/**
 *
 * @returns {string}
 * @throws {Error}
 */
export function getStatusShort(pSpawnFunction = spawnSync) {
  const lErrorMap = {
    129: `'${process.cwd()}' does not seem to be a git repository`,
  };
  return getGitResult(["status", "--porcelain"], lErrorMap, pSpawnFunction);
}

/**
 *
 * @param {string} pOldRevision the target to compare against (e.g. branch name, commit, tag etc)
 * @return {string}
 * @throws {Error}
 */
export function getDiffLines(pOldRevision, pSpawnFunction = spawnSync) {
  const lErrorMap = {
    128: `revision '${pOldRevision}' unknown `,
    129: `'${process.cwd()}' does not seem to be a git repository`,
  };
  return getGitResult(
    ["diff", pOldRevision, "--name-status"],
    lErrorMap,
    pSpawnFunction
  );
}
/**
 *
 * @returns {string}
 */
export function getSHA1(pSpawnFunction = spawnSync) {
  const SHA1_LENGTH = 40;

  return getGitResult(["rev-parse", "HEAD"], {}, pSpawnFunction).slice(
    0,
    SHA1_LENGTH
  );
}
