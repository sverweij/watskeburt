import formatToRegex from "./regex.mjs";
import formatToJSON from "./json.mjs";

const OUTPUT_TYPE_TO_FUNCTION = {
  regex: formatToRegex,
  json: formatToJSON,
  object: (x) => x,
};
const DEFAULT_OUTPUT_TYPE = "object";

/**
 *
 * @param {import("../../types/watskeburt.js").IChange[]} pChanges
 * @param {import("../../types/watskeburt.js").outputTypeType} pOutputType
 * @returns {string|import("../../types/watskeburt.js").IChange[]}
 */
export default function format(pChanges, pOutputType) {
  return OUTPUT_TYPE_TO_FUNCTION[pOutputType || DEFAULT_OUTPUT_TYPE](pChanges);
}
