import { deepEqual, throws } from "node:assert/strict";
import { describe, it } from "node:test";
import { format } from "./format.js";

describe("format", () => {
  it("throws when passed non-existing format", () => {
    // @ts-expect-error passing an invalid value for the outputType on purpose
    throws(() => format([], "this format is not known"));
  });
  it("returns a regex when passed regex as a format", () => {
    deepEqual(format([], "regex", ""), "^(?:)$");
  });
  it("returns json when passed json as a format", () => {
    deepEqual(format([], "json", ""), "[]");
  });
  it("doesn't throw a TypeError when 'extensions' aren't provided", () => {
    // @ts-expect-error 2554 - Expected 3 arguments, but got 2 is a correct
    // error, but we want to test the behavior of the function
    // when it's not passed at all, which is very possible in javascript
    // and (with a ts-expect-error comment) in typescript as well.
    deepEqual(format([], "regex"), "^(?:)$");
  });
  it("ensures regexp doesn't filter if no extensions are provided", () => {
    deepEqual(
      // @ts-expect-error 2554 - see above
      format(
        [
          {
            type: "modified",
            name: "dist/format/format.js",
          },
          {
            type: "modified",
            name: "src/format/format.spec.ts",
          },
          {
            type: "modified",
            name: "src/format/format.ts",
          },
        ],
        "regex",
      ),
      "^(?:dist/format/format[.]js|src/format/format[.]spec[.]ts|src/format/format[.]ts)$",
    );
  });
  it("ensures regexp _does_ filter when provided with the empty string as list of extensions)", () => {
    deepEqual(
      format(
        [
          {
            type: "modified",
            name: "dist/format/format.js",
          },
          {
            type: "modified",
            name: "src/format/format.spec.ts",
          },
          {
            type: "modified",
            name: "src/format/format.ts",
          },
        ],
        "regex",
        "",
      ),
      "^(?:)$",
    );
  });
});
