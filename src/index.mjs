import {
  convertDiffLines,
  convertStatusLines,
} from "./convert-to-change-object.mjs";
import { getDiffLines, getStatusShort } from "./get-diff-lines.mjs";
import { program } from "commander";
import format from "./formatters/format.mjs";

program
  .description("lists files since <reference>")
  .option("-T, --output-type <type>", "json,regex", "regex")
  .option("--tracked-only", "only take tracked files into account", false)
  .arguments("<reference>")
  .parse(process.argv);

if (program.args[0]) {
  try {
    let lChanges = convertDiffLines(getDiffLines(program.args[0]));

    if (!program.opts().trackedOnly) {
      lChanges = lChanges.concat(
        convertStatusLines(getStatusShort()).filter(
          ({ changeType }) => changeType === "untracked"
        )
      );
    }
    console.log(format(lChanges, program.opts().outputType));
  } catch (pError) {
    console.error(pError);
  }
} else {
  program.help();
}
