import type { IChange, outputTypeType } from "../../types/watskeburt.js";
import formatAsRegex from "./regex.js";
import formatAsJSON from "./json.js";

const OUTPUT_TYPE_TO_FUNCTION: Map<
  outputTypeType,
  (pChanges: IChange[]) => string
> = new Map([
  ["regex", formatAsRegex],
  ["json", formatAsJSON],
]);

export function format(
  pChanges: IChange[],
  pOutputType: outputTypeType,
): string {
  // @ts-expect-error ts(2722) - Object is possibly 'undefined' - that's not
  // possible // because the OUTPUT_TYPE_TO_FUNCTION map contains all possible
  // output types
  return OUTPUT_TYPE_TO_FUNCTION.get(pOutputType)(pChanges);
}
