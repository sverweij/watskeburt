import { deepEqual } from "node:assert";
import format from "./format.js";

describe("format", () => {
  it("by default formats as a plain object", () => {
    deepEqual(format([]), []);
  });
  it("by formats as a plain object when passed non-existing format", () => {
    // @ts-expect-error passing an invalid value for the outputType on purpose
    deepEqual(format([], "this format is not known"), []);
  });
  it("returns a regex when passed regex as a format", () => {
    deepEqual(format([], "regex"), "^()$");
  });
  it("returns json when passed json as a format", () => {
    deepEqual(format([], "json"), "[]");
  });
});
