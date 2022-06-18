/**
 *
 * @param {import('../types/diff-dat').IChange[]} pChanges
 * @return {string}
 */
export default function formatToJSON(pChanges) {
  return JSON.stringify(pChanges, null, 2);
}
