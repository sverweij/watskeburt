import { deepEqual } from "node:assert";
import { describe, it } from "node:test";
import { parseStatusLine, parseStatusLines } from "./parse-status-lines.js";

describe("convert status line to change object", () => {
  it("recognizes unstaged modified files", () => {
    deepEqual(parseStatusLine(" M src/convert-to-change-object.mjs"), {
      name: "src/convert-to-change-object.mjs",
      changeType: "modified",
    });
  });
  it("recognizes staged modified files", () => {
    deepEqual(parseStatusLine("M  src/convert-to-change-object.mjs"), {
      name: "src/convert-to-change-object.mjs",
      changeType: "modified",
    });
  });
  it("recognizes untracked files", () => {
    deepEqual(parseStatusLine("?? new-not-in-source-control"), {
      name: "new-not-in-source-control",
      changeType: "untracked",
    });
  });
  it("recognizes renamed files", () => {
    deepEqual(parseStatusLine("R  new -> new-renamed"), {
      name: "new-renamed",
      changeType: "renamed",
      oldName: "new",
    });
  });
});

describe("convert status lines to change objects", () => {
  it("empty string delivers an empty array", () => {
    deepEqual(parseStatusLines(""), []);
  });

  it("string with invalid line(s) only delivers an empty array", () => {
    deepEqual(parseStatusLines("X\t\n"), []);
  });

  it("bunch of valid lines deliver array of change records", () => {
    deepEqual(
      parseStatusLines(
        [
          "R  old -> new",
          "M  modstaged",
          "MM modboth",
          "?? nottracked",
          "!! ignore",
          "D  deleted",
        ].join("\n"),
      ),
      [
        {
          changeType: "renamed",
          name: "new",
          oldName: "old",
        },
        {
          changeType: "modified",
          name: "modstaged",
        },
        {
          changeType: "modified",
          name: "modboth",
        },
        {
          changeType: "untracked",
          name: "nottracked",
        },
        {
          changeType: "ignored",
          name: "ignore",
        },
        {
          changeType: "deleted",
          name: "deleted",
        },
      ],
    );
  });
});
