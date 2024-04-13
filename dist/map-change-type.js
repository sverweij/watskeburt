const CHANGE_CHAR_2_CHANGE_TYPE = new Map([
	["A", "added"],
	["C", "copied"],
	["D", "deleted"],
	["M", "modified"],
	["R", "renamed"],
	["T", "type changed"],
	["U", "unmerged"],
	["B", "pairing broken"],
	[" ", "unmodified"],
	["?", "untracked"],
	["!", "ignored"],
]);
export function changeChar2ChangeType(pChar) {
	return CHANGE_CHAR_2_CHANGE_TYPE.get(pChar) ?? "unknown";
}
