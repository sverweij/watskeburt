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
      return pError.toString("utf8");
    } else {
      return pError;
    }
  }

  let lPromise = new Promise((pResolveFn, pRejectFn) => {
    git.stdout.on("data", (pData) => {
      lData += pData;
    });
    git.on("close", (pCode) => {
      if (lError) {
        pRejectFn(stringifyError(lError));
      }
      if (pCode === 0) {
        pResolveFn(lData);
      }
    });

    git.stderr.on("data", saveError);
    git.on("error", saveError);
  });

  return lPromise;
}
