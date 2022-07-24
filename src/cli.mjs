#!/usr/bin/env node
/* eslint-disable no-console */

import { program } from "commander";
import { listSync } from "./main.mjs";
import { VERSION } from "./version.mjs";

program
  .description(
    "lists files & their statuses since [revision].\n\n" +
      "-> When you don't pass a revision the revision defaults to the current one."
  )
  .version(VERSION)
  .option("-T, --output-type <type>", "json,regex", "regex")
  .option("--tracked-only", "only take tracked files into account", false)
  .arguments("[revision]")
  .parse(process.argv);

try {
  console.log(listSync(program.args[0], program.opts()));
} catch (pError) {
  console.error(`ERROR: ${pError.message}`);
}
