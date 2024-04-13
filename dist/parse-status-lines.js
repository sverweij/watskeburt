import { EOL } from "node:os";
import { changeChar2ChangeType } from "./map-change-type.js";
const DIFF_SHORT_STATUS_LINE_PATTERN =
	/^(?<stagedType>[ ACDMRTUXB?!])(?<unStagedType>[ ACDMRTUXB?!])[ \t]+(?<name>[^ \t]+)(( -> )(?<newName>[^ \t]+))?$/;
export function parseStatusLines(pString) {
	return pString
		.split(EOL)
		.filter(Boolean)
		.map(parseStatusLine)
		.filter(({ name, type }) => Boolean(name) && Boolean(type));
}
export function parseStatusLine(pString) {
	const lMatchResult = pString.match(DIFF_SHORT_STATUS_LINE_PATTERN);
	const lReturnValue = {};
	if (lMatchResult?.groups) {
		const lStagedType = changeChar2ChangeType(lMatchResult.groups.stagedType);
		const lUnStagedType = changeChar2ChangeType(
			lMatchResult.groups.unStagedType,
		);
		lReturnValue.type =
			lStagedType === "unmodified" ? lUnStagedType : lStagedType;
		if (lMatchResult.groups.newName) {
			lReturnValue.name = lMatchResult.groups.newName;
			lReturnValue.oldName = lMatchResult.groups.name;
		} else {
			lReturnValue.name = lMatchResult.groups.name;
		}
	}
	return lReturnValue;
}
