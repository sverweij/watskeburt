const INDENT = 2;
export default function formatToJSON(pChanges) {
  return JSON.stringify(pChanges, null, INDENT);
}
