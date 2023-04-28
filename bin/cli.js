#!/usr/bin/env node
/* eslint-disable no-console */
import { EOL } from "node:os";
import { Option, program } from "commander";
import { list } from "../dist/esm/main.js";
import { VERSION } from "./version.js";

program
  .description(
    "lists files & their statuses since [old-revision] " +
      "or between [old-revision] and [new-revision]." +
      `${EOL}${EOL}` +
      "-> When you don't pass a revision at all old-revision defaults to the current one."
  )
  .addOption(
    new Option("-T, --output-type <type>", "what format to emit")
      .choices(["json", "regex"])
      .default("regex")
  )
  .option("--tracked-only", "only take tracked files into account", false)
  .arguments("[old-revision] [new-revision]")
  .version(VERSION)
  .parse(process.argv);

try {
  console.log(await list(program.args[0], program.args[1], program.opts()));
} catch (pError) {
  console.error(`ERROR: ${pError.message}`);
}
