#!/usr/bin/env node
/* eslint-disable no-console */

import { program } from "commander";
import { listSync } from "../dist/esm-bundle.mjs";
import { VERSION } from "./version.mjs";

program
  .description(
    "lists files & their statuses since [old-revision] " +
      "or between [old-revision] and [new-revision]." +
      "\n\n" +
      "-> When you don't pass a revision at all old-revision defaults to the current one."
  )
  .version(VERSION)
  .option("-T, --output-type <type>", "json,regex", "regex")
  .option("--tracked-only", "only take tracked files into account", false)
  .arguments("[old-revision] [new-revision]")
  .parse(process.argv);

try {
  console.log(listSync(program.args[0], program.args[1], program.opts()));
} catch (pError) {
  console.error(`ERROR: ${pError.message}`);
}
