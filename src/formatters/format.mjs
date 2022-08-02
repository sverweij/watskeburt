import formatToRegex from "./regex.mjs";
import formatToJSON from "./json.mjs";

const identity = (pX) => pX;
const OUTPUT_TYPE_TO_FUNCTION = new Map([
  ["regex", formatToRegex],
  ["json", formatToJSON],
]);

/**
 *
 * @param {import("../../types/watskeburt.js").IChange[]} pChanges
 * @param {import("../../types/watskeburt.js").outputTypeType} pOutputType
 * @returns {string|import("../../types/watskeburt.js").IChange[]}
 */
export default function format(pChanges, pOutputType) {
  return (OUTPUT_TYPE_TO_FUNCTION.get(pOutputType) || identity)(pChanges);
}
