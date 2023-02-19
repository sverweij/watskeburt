import type { IChange, outputTypeType } from "../../types/watskeburt";
import formatToRegex from "./regex.js";
import formatToJSON from "./json.js";

const identity = <Type>(pX: Type): Type => pX;
const OUTPUT_TYPE_TO_FUNCTION = new Map([
  ["regex", formatToRegex],
  ["json", formatToJSON],
]);

export default function format(
  pChanges: IChange[],
  pOutputType?: outputTypeType
): string | IChange[] {
  return (OUTPUT_TYPE_TO_FUNCTION.get(pOutputType ?? "unknown") || identity)(
    pChanges
  );
}
