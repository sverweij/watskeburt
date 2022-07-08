#!/usr/bin/env node

import { program } from "commander";
import { convert } from "./main.mjs";

program
  .description("lists files & their statuses since <reference>")
  .option("-T, --output-type <type>", "json,regex", "regex")
  .option("--tracked-only", "only take tracked files into account", false)
  .arguments("<reference>")
  .parse(process.argv);

if (program.args[0]) {
  try {
    console.log(convert(program.args[0], program.opts()));
  } catch (pError) {
    console.error(`ERROR: ${pError.message}`);
  }
} else {
  program.help();
}
