import { extname } from "node:path";
const DEFAULT_EXTENSIONS = new Set([
	".cjs",
	".cjsx",
	".coffee",
	".csx",
	".cts",
	".js",
	".json",
	".jsx",
	".litcoffee",
	".ls",
	".mjs",
	".mts",
	".svelte",
	".ts",
	".tsx",
	".vue",
	".vuex",
]);
const DEFAULT_CHANGE_TYPES = new Set([
	"modified",
	"added",
	"renamed",
	"copied",
	"untracked",
]);
export default function formatAsRegex(
	pChanges,
	pExtensions = DEFAULT_EXTENSIONS,
	pChangeTypes = DEFAULT_CHANGE_TYPES,
) {
	const lChanges = pChanges
		.filter(
			(pChange) =>
				pChangeTypes.has(pChange.type) &&
				pExtensions.has(extname(pChange.name)),
		)
		.map(({ name }) => name.replace(/\\/g, "\\\\").replace(/\./g, "[.]"))
		.join("|");
	return `^(${lChanges})$`;
}
