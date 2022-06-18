import formatToRegex from "./formatters/regex.mjs";
import formatToJSON from "./formatters/json.mjs";

const OUTPUT_TYPE_TO_FUNCTION = {
  regex: formatToRegex,
  json: formatToJSON,
};

export default function format(pChanges, pOutputType) {
  return OUTPUT_TYPE_TO_FUNCTION[pOutputType](pChanges);
}
