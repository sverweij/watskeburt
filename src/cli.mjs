#!/usr/bin/env node
/* eslint-disable no-console */

import { program } from "commander";
import { list } from "./main.mjs";
import { VERSION } from "./version.mjs";

program
  .description("lists files & their statuses since <revision>")
  .version(VERSION)
  .option("-T, --output-type <type>", "json,regex", "regex")
  .option("--tracked-only", "only take tracked files into account", false)
  .arguments("<revision>")
  .parse(process.argv);

if (program.args[0]) {
  try {
    console.log(list(program.args[0], program.opts()));
  } catch (pError) {
    console.error(`ERROR: ${pError.message}`);
  }
} else {
  program.help();
}
