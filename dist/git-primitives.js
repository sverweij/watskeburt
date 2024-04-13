import { spawn } from "node:child_process";
export async function getStatusShort(pSpawnFunction = spawn) {
	const lErrorMap = new Map([
		[129, `'${process.cwd()}' does not seem to be a git repository`],
	]);
	const lResult = await getGitResult(
		["status", "--porcelain"],
		lErrorMap,
		pSpawnFunction,
	);
	return lResult;
}
export async function getDiffLines(
	pOldRevision,
	pNewRevision,
	pSpawnFunction = spawn,
) {
	const lErrorMap = new Map([
		[
			128,
			`revision '${pOldRevision}' ${pNewRevision ? `(or '${pNewRevision}') ` : ""}unknown`,
		],
		[129, `'${process.cwd()}' does not seem to be a git repository`],
	]);
	const lResult = await getGitResult(
		pNewRevision
			? ["diff", pOldRevision, pNewRevision, "--name-status"]
			: ["diff", pOldRevision, "--name-status"],
		lErrorMap,
		pSpawnFunction,
	);
	return lResult;
}
export async function getSHA(pSpawnFunction = spawn) {
	const lSha1Length = 40;
	const lResult = await getGitResult(
		["rev-parse", "HEAD"],
		new Map(),
		pSpawnFunction,
	);
	return lResult.slice(0, lSha1Length);
}
function getGitResult(pArguments, pErrorMap, pSpawnFunction) {
	const lGit = pSpawnFunction("git", pArguments, {
		cwd: process.cwd(),
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
						pErrorMap.get(pCode ?? 0) ||
							`internal git error: ${pCode} (${stringifyOutStream(lStdErrorData)})`,
					),
				);
			}
		});
		lGit.on("error", (pError) => {
			if (pError?.code === "ENOENT") {
				pReject(new Error("git executable not found"));
			} else {
				pReject(new Error(`internal spawn error: ${pError}`));
			}
		});
	});
}
function stringifyOutStream(pBufferOrString) {
	if (pBufferOrString instanceof Buffer) {
		return pBufferOrString.toString("utf8");
	} else {
		return pBufferOrString;
	}
}
