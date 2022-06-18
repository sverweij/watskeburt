import { deepEqual } from "node:assert";
import format from "./regex.mjs";

describe("regex formatter", () => {
  it("empty array yields empty regex", () => {
    deepEqual(format([]), "^()$");
  });

  it("one file in diff yields regex with that thing", () => {
    deepEqual(
      format([{ changeType: "added", name: "added.mjs" }]),
      "^(added.mjs)$"
    );
  });

  it(">1 file in diff yields regex with these things thing", () => {
    deepEqual(
      format([
        { changeType: "added", name: "added.mjs" },
        { changeType: "modified", name: "changed.mjs" },
      ]),
      "^(added.mjs|changed.mjs)$"
    );
  });
});
