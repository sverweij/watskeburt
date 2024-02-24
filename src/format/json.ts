import type { IChange } from "../../types/watskeburt.js";

const INDENT = 2;

export default function formatAsJSON(pChanges: IChange[]): string {
  return JSON.stringify(pChanges, null, INDENT);
}
