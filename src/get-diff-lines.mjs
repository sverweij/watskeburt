import { spawnSync } from "node:child_process";

function stringifyOutStream(pError) {
  if (pError instanceof Buffer) {
    return pError.toString("utf8");
  } else {
    return pError;
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

  if (lGitResult.status === 0) {
    return stringifyOutStream(lGitResult.stdout);
  } else {
    throw new Error(
      pErrorMap[lGitResult.status] || `unknown error: ${lGitResult.status}`
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
 * @param {string} pOldThing the target to compare against (e.g. branch name, commit, tag etc)
 * @return {string}
 * @throws {Error}
 */
export function getDiffLines(pOldThing, pSpawnFunction = spawnSync) {
  const lErrorMap = {
    128: `revision '${pOldThing}' unknown `,
    129: `'${process.cwd()}' does not seem to be a git repository`,
  };
  return getGitResult(
    ["diff", pOldThing, "--name-status"],
    lErrorMap,
    pSpawnFunction
  );
}
