import { deepEqual, throws } from "node:assert/strict";
import { describe, it } from "node:test";
import { format } from "./format.js";

describe("format", () => {
  it("throws when passed non-existing format", () => {
    // @ts-expect-error passing an invalid value for the outputType on purpose
    throws(() => format([], "this format is not known"));
  });
  it("returns a regex when passed regex as a format", () => {
    deepEqual(format([], "regex", ""), "^()$");
  });
  it("returns json when passed json as a format", () => {
    deepEqual(format([], "json", ""), "[]");
  });
});
