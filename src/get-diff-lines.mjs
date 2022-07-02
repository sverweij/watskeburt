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
 * @param {string[]} pArguments
 * @param {string} pGitCommand - the git command to run; defaults to "git"
 * @param {string} pWorkingDirectory - the working directory to run the command in; defaults to the current directory
 * @return {string}
 * @throws {Error}
 */
export function getGitResult(pArguments, pGitCommand, pWorkingDirectory) {
  const lGitResult = spawnSync(pGitCommand, pArguments, {
    cwd: pWorkingDirectory,
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
 * @param {string} pGitCommand - the git command to run; defaults to "git"
 * @param {string} pWorkingDirectory - the working directory to run the command in; defaults to the current directory
 * @returns {string}
 * @throws {Error}
 */
export function getStatusShort(
  pGitCommand = "git",
  pWorkingDirectory = process.cwd()
) {
  return getGitResult(
    ["status", "--porcelain"],
    pGitCommand,
    pWorkingDirectory
  );
}

/**
 *
 * @param {string} pOldThing the target to compare against (e.g. branch name, commit, tag etc)
 * @param {string} pGitCommand - the git command to run; defaults to "git"
 * @param {string} pWorkingDirectory - the working directory to run the command in; defaults to the current directory
 * @return {string}
 * @throws {Error}
 */
export function getDiffLines(
  pOldThing,
  pGitCommand = "git",
  pWorkingDirectory = process.cwd()
) {
  return getGitResult(
    ["diff", pOldThing, "--name-status"],
    pGitCommand,
    pWorkingDirectory
  );
}
