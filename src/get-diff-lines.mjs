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
function getGitResult(pArguments) {
  const lGitResult = spawnSync("git", pArguments, {
    cwd: process.cwd(),
    env: process.env,
  });

  if (lGitResult.error) {
    console.error(JSON.stringify(lGitResult, null, 2));
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
export function getStatusShort() {
  return getGitResult(["status", "--porcelain"]);
}

/**
 *
 * @param {string} pOldThing the target to compare against (e.g. branch name, commit, tag etc)
 * @return {string}
 * @throws {Error}
 */
export function getDiffLines(pOldThing) {
  return getGitResult(["diff", pOldThing, "--name-status"]);
}
