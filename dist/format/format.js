import formatAsRegex from "./regex.js";
import formatAsJSON from "./json.js";
const OUTPUT_TYPE_TO_FUNCTION = new Map([
	["regex", formatAsRegex],
	["json", formatAsJSON],
]);
export function format(pChanges, pOutputType) {
	return OUTPUT_TYPE_TO_FUNCTION.get(pOutputType)(pChanges);
}
