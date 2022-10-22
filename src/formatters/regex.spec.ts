import { deepEqual } from "node:assert";
import format from "./regex.js";

describe("regex formatter", () => {
  const lChangesOfEachType = [
    { changeType: "added", name: "added.mjs" },
    { changeType: "copied", name: "copied.mjs" },
    { changeType: "deleted", name: "deleted.mjs" },
    { changeType: "modified", name: "modified.mjs" },
    { changeType: "renamed", name: "renamed.mjs", oldName: "oldname.mjs" },
    { changeType: "type changed", name: "type-changed.mjs" },
    { changeType: "unmerged", name: "unmerged.mjs" },
    { changeType: "pairing broken", name: "pairing-broken.mjs" },
    { changeType: "unknown", name: "unknown.mjs" },
    { changeType: "unmodified", name: "unmodified.mjs" },
    { changeType: "untracked", name: "untracked.mjs" },
    { changeType: "ignored", name: "ignored.mjs" },
    { changeType: "ignored", name: "ignored-too.js" },
  ];

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

  it("by default only takes changes into account that changed the contents + untracked files", () => {
    deepEqual(
      format(lChangesOfEachType),
      "^(added.mjs|copied.mjs|modified.mjs|renamed.mjs|untracked.mjs)$"
    );
  });

  it("when passed list of change types only emits changes of that type", () => {
    deepEqual(
      format(
        lChangesOfEachType,
        new Set([".mjs"]),
        new Set(["type changed", "pairing broken", "ignored"])
      ),
      "^(type-changed.mjs|pairing-broken.mjs|ignored.mjs)$"
    );
  });

  it("when passed list of extensions only takes those into account", () => {
    deepEqual(
      format(
        [
          {
            changeType: "added",
            name: "added.aap",
          },
          {
            changeType: "modified",
            name: "modified.aap",
          },
          {
            changeType: "added",
            name: "added.noot",
          },
          {
            changeType: "added",
            name: "added.mies",
          },
          {
            changeType: "added",
            name: "added.wim",
          },
          {
            changeType: "added",
            name: "added.zus",
          },
        ],
        new Set([".aap", ".noot", ".mies"])
      ),
      "^(added.aap|modified.aap|added.noot|added.mies)$"
    );
  });
});
