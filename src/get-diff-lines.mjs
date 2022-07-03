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
function getGitResult(pArguments, pSpawnFunction) {
  const lGitResult = pSpawnFunction("git", pArguments, {
    cwd: process.cwd(),
    env: process.env,
  });

  if (lGitResult.error) {
    throw new Error(stringifyOutStream(lGitResult.error));
  }

  if (lGitResult.status === 0) {
    return stringifyOutStream(lGitResult.stdout);
  } else {
    throw new Error(lGitResult.output);
  }
}

/**
 *
 * @returns {string}
 * @throws {Error}
 */
export function getStatusShort(pSpawnFunction = spawnSync) {
  return getGitResult(["status", "--porcelain"], pSpawnFunction);
}

/**
 *
 * @param {string} pOldThing the target to compare against (e.g. branch name, commit, tag etc)
 * @return {string}
 * @throws {Error}
 */
export function getDiffLines(pOldThing, pSpawnFunction = spawnSync) {
  return getGitResult(["diff", pOldThing, "--name-status"], pSpawnFunction);
}
