import formatToRegex from "./formatters/regex.mjs";
import formatToJSON from "./formatters/json.mjs";

const OUTPUT_TYPE_TO_FUNCTION = {
  regex: formatToRegex,
  json: formatToJSON,
};
const DEFAULT_OUTPUT_TYPE = "json";

export default function format(pChanges, pOutputType) {
  return OUTPUT_TYPE_TO_FUNCTION[pOutputType || DEFAULT_OUTPUT_TYPE](pChanges);
}
