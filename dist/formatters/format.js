import formatToRegex from "./regex.js";
import formatToJSON from "./json.js";
const identity = (pX) => pX;
const OUTPUT_TYPE_TO_FUNCTION = new Map([
  ["regex", formatToRegex],
  ["json", formatToJSON],
]);
export default function format(pChanges, pOutputType) {
  return (OUTPUT_TYPE_TO_FUNCTION.get(pOutputType ?? "unknown") || identity)(
    pChanges,
  );
}
