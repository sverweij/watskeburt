import { readFileSync } from "node:fs";
import prettier from "prettier";

const $package = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
);
process.stdout.write(
  prettier.format(`export const VERSION = "${$package.version}";\n`, {
    parser: "babel",
  })
);
