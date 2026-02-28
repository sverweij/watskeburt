import { deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import type { IChange } from "../../types/watskeburt.js";
import format from "./regex.js";

const EXTENSION_SET = new Set([".mjs"]);

describe("regex formatter", () => {
  const lChangesOfEachType: IChange[] = [
    { type: "added", name: "added.mjs" },
    { type: "copied", name: "copied.mjs" },
    { type: "deleted", name: "deleted.mjs" },
    { type: "modified", name: "modified.mjs" },
    { type: "renamed", name: "renamed.mjs", oldName: "oldname.mjs" },
    { type: "type changed", name: "type-changed.mjs" },
    { type: "unmerged", name: "unmerged.mjs" },
    { type: "pairing broken", name: "pairing-broken.mjs" },
    { type: "unknown", name: "unknown.mjs" },
    { type: "unmodified", name: "unmodified.mjs" },
    { type: "untracked", name: "untracked.mjs" },
    { type: "ignored", name: "ignored.mjs" },
    { type: "ignored", name: "ignored-too.js" },
  ];

  it("empty array yields empty regex", () => {
    //@ts-expect-error Testing invalid input
    deepEqual(format([]), "^(?:)$");
  });

  it("one file in diff yields regex with that thing", () => {
    deepEqual(
      format([{ type: "added", name: "added.mjs" }], EXTENSION_SET),
      "^(?:added[.]mjs)$",
    );
  });

  it("one file in diff with a backslash in its name (wut) yields regex with that thing", () => {
    deepEqual(
      format([{ type: "added", name: String.raw`ad\ded.mjs` }], EXTENSION_SET),
      String.raw`^(?:ad\\ded[.]mjs)$`,
    );
  });

  it(">1 file in diff yields regex with these things thing", () => {
    deepEqual(
      format(
        [
          { type: "added", name: "added.mjs" },
          { type: "modified", name: "changed.mjs" },
        ],
        EXTENSION_SET,
      ),
      "^(?:added[.]mjs|changed[.]mjs)$",
    );
  });

  it("by default only takes changes into account that changed the contents + untracked files", () => {
    deepEqual(
      format(lChangesOfEachType, EXTENSION_SET),
      "^(?:added[.]mjs|copied[.]mjs|modified[.]mjs|renamed[.]mjs|untracked[.]mjs)$",
    );
  });

  it("when passed list of change types only emits changes of that type", () => {
    deepEqual(
      format(
        lChangesOfEachType,
        new Set([".mjs"]),
        new Set(["type changed", "pairing broken", "ignored"]),
      ),
      "^(?:type-changed[.]mjs|pairing-broken[.]mjs|ignored[.]mjs)$",
    );
  });

  it("when passed list of extensions only takes those into account", () => {
    deepEqual(
      format(
        [
          {
            type: "added",
            name: "added.aap",
          },
          {
            type: "modified",
            name: "modified.aap",
          },
          {
            type: "added",
            name: "added.noot",
          },
          {
            type: "added",
            name: "added.mies",
          },
          {
            type: "added",
            name: "added.wim",
          },
          {
            type: "added",
            name: "added.zus",
          },
        ],
        new Set([".aap", ".noot", ".mies"]),
      ),
      "^(?:added[.]aap|modified[.]aap|added[.]noot|added[.]mies)$",
    );
  });
  it("when list of extensions contains '.*', returns all the things", () => {
    deepEqual(
      format(
        [
          {
            type: "added",
            name: "added.aap",
          },
          {
            type: "modified",
            name: "modified.aap",
          },
          {
            type: "added",
            name: "added.noot",
          },
          {
            type: "added",
            name: "added.mies",
          },
          {
            type: "added",
            name: "added.wim",
          },
          {
            type: "added",
            name: "added.zus",
          },
        ],
        new Set([".*"]),
      ),
      "^(?:added[.]aap|modified[.]aap|added[.]noot|added[.]mies|added[.]wim|added[.]zus)$",
    );
  });
});
