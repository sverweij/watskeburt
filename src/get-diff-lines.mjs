import { spawn } from "child_process";

/**
 *
 * @param {string} pOldThing the target to compare against (e.g. branch name, commit, tag etc)
 * @return {Promise<string>}
 */
export function doMagic(pOldThing) {
  const git = spawn("git", ["diff", pOldThing, "--name-status"], {
    cwd: process.cwd(),
  });
  let lData = "";
  let lError = null;

  function saveError(pError) {
    lError = pError;
  }
  function stringifyError(pError) {
    if (lError instanceof Buffer) {
      return lError.toString("utf8");
    } else {
      return lError;
    }
  }

  git.stdout.on("data", (pData) => {
    lData += pData;
  });
  git.on("close", (pCode) => {
    if (lError) {
      return Promise.reject(stringifyError(lError));
    }
    if (pCode === 0) {
      return Promise.resolve(lData);
    }
  });

  git.stderr.on("data", saveError);
  git.on("error", saveError);
}
