import { IChange } from "../../types/watskeburt";

const INDENT = 2;

export default function formatToJSON(pChanges: IChange[]): string {
  return JSON.stringify(pChanges, null, INDENT);
}
