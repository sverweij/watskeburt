import { deepEqual } from "node:assert";
import { describe, it } from "node:test";
import format from "./json.js";

describe("json formatter", () => {
  it("empty array yields stringified empty array", () => {
    deepEqual(format([]), "[]");
  });

  it(">1 file in diff yields regex with these things thing", () => {
    deepEqual(
      format([
        { changeType: "added", name: "added.mjs" },
        { changeType: "modified", name: "changed.mjs" },
      ]),
      `[
  {
    "changeType": "added",
    "name": "added.mjs"
  },
  {
    "changeType": "modified",
    "name": "changed.mjs"
  }
]`,
    );
  });
});
