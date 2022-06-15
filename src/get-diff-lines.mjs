import { spawnSync } from "child_process";

function stringifyOutStream(pError) {
  if (pError instanceof Buffer) {
    return pError.toString("utf8");
  } else {
    return pError;
  }
}

/**
 *
 * @param {string} pOldThing the target to compare against (e.g. branch name, commit, tag etc)
 * @return {string}
 * @throws {Error}
 */
export function getDiffLines(pOldThing) {
  const lGitResult = spawnSync("git", ["diff", pOldThing, "--name-status"], {
    cwd: process.cwd(),
  });

  if (lGitResult.error) {
    throw new Error(stringifyOutStream(lGitResult.error));
  }
  if (lGitResult.status === 0) {
    return stringifyOutStream(lGitResult.stdout);
  }
}
