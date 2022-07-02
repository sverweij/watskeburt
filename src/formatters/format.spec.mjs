import { deepEqual } from "node:assert";
import format from "./format.mjs";

describe("format", () => {
  it("by default formats as a plain object", () => {
    deepEqual(format([]), []);
  });
  it("returns a regex when passed regex as a format", () => {
    deepEqual(format([], "regex"), "^()$");
  });
  it("returns json when passed json as a format", () => {
    deepEqual(format([], "json"), "[]");
  });
});
