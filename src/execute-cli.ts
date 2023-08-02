import { EOL } from "node:os";
import { parseArgs } from "node:util";
import { type Writable } from "node:stream";
import { type IFormatOptions } from "types/watskeburt.js";
import { list } from "./main.js";
import { VERSION } from "./version.js";

interface ICLIOptions extends Required<IFormatOptions> {
  help: boolean;
  version: boolean;
}

interface IArguments {
  values: ICLIOptions;
  positionals: string[];
}

const HELP_MESSAGE = `Usage: watskeburt [options] [old-revision] [new-revision]

lists files & their statuses since [old-revision] or between [old-revision] and [new-revision].

-> When you don't pass a revision at all old-revision defaults to the current one.

Options:
  -T, --outputType <type>  what format to emit (choices: "json", "regex", default: "regex")
  --trackedOnly            only take tracked files into account (default: false)
  -V, --version            output the version number
  -h, --help               display help for command${EOL}`;

export async function cli(
  // eslint-disable-next-line no-magic-numbers
  pArguments: string[] = process.argv.slice(2),
  pOutStream: Writable = process.stdout,
  pErrorStream: Writable = process.stderr,
  pErrorExitCode: number = 1,
) {
  try {
    const lArguments = getArguments(pArguments);

    if (lArguments.values.help) {
      pOutStream.write(HELP_MESSAGE);
      return;
    }

    if (lArguments.values.version) {
      pOutStream.write(`${VERSION}${EOL}`);
      return;
    }

    if (!outputTypeIsValid(lArguments.values.outputType)) {
      pErrorStream.write(
        `error: option '-T, --outputType <type>' argument '${lArguments.values.outputType}' is invalid. Allowed choices are json, regex.${EOL}`,
      );
      process.exitCode = pErrorExitCode;
      return;
    }

    const lResult = await list(
      lArguments.positionals[0],
      lArguments.positionals[1],
      lArguments.values,
    );
    pOutStream.write(`${lResult}${EOL}`);
  } catch (pError: unknown) {
    pErrorStream.write(`${EOL}ERROR: ${(pError as Error).message}${EOL}${EOL}`);
    // eslint-disable-next-line require-atomic-updates
    process.exitCode = pErrorExitCode;
  }
}

function getArguments(pArguments: string[]): IArguments {
  return parseArgs({
    args: pArguments,
    options: {
      outputType: {
        type: "string",
        short: "T",
        default: "regex",
      },
      trackedOnly: {
        type: "boolean",
        default: false,
      },
      help: { type: "boolean", short: "h", default: false },
      version: { type: "boolean", short: "V", default: false },
    },
    strict: true,
    allowPositionals: true,
    tokens: false,
  }) as IArguments;
}

function outputTypeIsValid(pOutputType: string) {
  return ["json", "regex"].includes(pOutputType);
}
