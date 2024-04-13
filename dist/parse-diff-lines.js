import { EOL } from "node:os";
import { changeChar2ChangeType } from "./map-change-type.js";
const DIFF_NAME_STATUS_LINE_PATTERN =
	/^(?<type>[ACDMRTUXB])(?<similarity>[0-9]{3})?[ \t]+(?<name>[^ \t]+)[ \t]*(?<newName>[^ \t]+)?$/;
export function parseDiffLines(pString) {
	return pString
		.split(EOL)
		.filter(Boolean)
		.map(parseDiffLine)
		.filter(({ name, type }) => Boolean(name) && Boolean(type));
}
export function parseDiffLine(pString) {
	const lMatchResult = pString.match(DIFF_NAME_STATUS_LINE_PATTERN);
	const lReturnValue = {};
	if (lMatchResult?.groups) {
		lReturnValue.type = changeChar2ChangeType(lMatchResult.groups.type);
		if (lMatchResult.groups.newName) {
			lReturnValue.name = lMatchResult.groups.newName;
			lReturnValue.oldName = lMatchResult.groups.name;
		} else {
			lReturnValue.name = lMatchResult.groups.name;
		}
	}
	return lReturnValue;
}
