import { convertLines } from "./convert-to-change-object.mjs";
import { getDiffLines } from "./get-diff-lines.mjs";
import { extname } from "node:path";
import { program } from "commander";

program
  .description("lists files since <reference>")
  .option("-T, --output-type <type>", "json,regex", "regex")
  .arguments("<reference>")
  .parse(process.argv);

/**
 *
 * @param {import('../types/diff-dat').IChange[]} pChanges
 */
function formatToRegex(pChanges) {
  return pChanges
    .filter((pChange) =>
      ["modified", "added", "renamed", "copied"].includes(pChange.changeType)
    )
    .map(
      ({ name }) => name //.replace(/\./g, "\\\\.")
    )
    .filter((pName) => [".js", ".ts", ".mjs", ".cjs"].includes(extname(pName)))
    .join("|");
}

/**
 *
 * @param {import('../types/diff-dat').IChange[]} pChanges
 */
function formatToJSON(pChanges) {
  return JSON.stringify(pChanges, null, 2);
}

const OUTPUT_TYPE_TO_FUNCTION = {
  regex: formatToRegex,
  json: formatToJSON,
};

if (program.args[0]) {
  try {
    const lDiffLines = getDiffLines(program.args[0]);
    const lChanges = convertLines(lDiffLines);
    console.log(OUTPUT_TYPE_TO_FUNCTION[program.opts().outputType](lChanges));
  } catch (pError) {
    console.error(pError);
  }
} else {
  program.help();
}
