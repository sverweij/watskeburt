import { IChange } from "../../types/watskeburt";

const INDENT = 2;
/**
 *
 * @param {import('../types/watskeburt').IChange[]} pChanges
 * @return {string}
 */
export default function formatToJSON(pChanges: IChange[]): string {
  return JSON.stringify(pChanges, null, INDENT);
}
