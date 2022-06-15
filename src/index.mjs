import { convertDiffLines } from "./convert-to-change-object.mjs";
import { getDiffLines } from "./get-diff-lines.mjs";
import { program } from "commander";
import format from "./format.mjs";

program
  .description("lists files since <reference>")
  .option("-T, --output-type <type>", "json,regex", "regex")
  .arguments("<reference>")
  .parse(process.argv);

if (program.args[0]) {
  try {
    const lDiffLines = getDiffLines(program.args[0]);
    const lChanges = convertDiffLines(lDiffLines);
    console.log(format(lChanges, program.opts().outputType));
  } catch (pError) {
    console.error(pError);
  }
} else {
  program.help();
}
