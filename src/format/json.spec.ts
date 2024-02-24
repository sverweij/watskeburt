import { deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import format from "./json.js";

describe("json formatter", () => {
  it("empty array yields stringified empty array", () => {
    deepEqual(format([]), "[]");
  });

  it(">1 file in diff yields regex with these things thing", () => {
    deepEqual(
      format([
        { type: "added", name: "added.mjs" },
        { type: "modified", name: "changed.mjs" },
      ]),
      `[
  {
    "type": "added",
    "name": "added.mjs"
  },
  {
    "type": "modified",
    "name": "changed.mjs"
  }
]`,
    );
  });
});
