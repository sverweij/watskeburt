import { deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { parseStatusLine, parseStatusLines } from "./parse-status-lines.js";

describe("convert status line to change object", () => {
  it("recognizes unstaged modified files", () => {
    deepEqual(parseStatusLine(" M src/convert-to-change-object.mjs"), {
      name: "src/convert-to-change-object.mjs",
      type: "modified",
    });
  });
  it("recognizes staged modified files", () => {
    deepEqual(parseStatusLine("M  src/convert-to-change-object.mjs"), {
      name: "src/convert-to-change-object.mjs",
      type: "modified",
    });
  });
  it("recognizes untracked files", () => {
    deepEqual(parseStatusLine("?? new-not-in-source-control"), {
      name: "new-not-in-source-control",
      type: "untracked",
    });
  });
  it("recognizes renamed files", () => {
    deepEqual(parseStatusLine("R  new -> new-renamed"), {
      name: "new-renamed",
      type: "renamed",
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
          type: "renamed",
          name: "new",
          oldName: "old",
        },
        {
          type: "modified",
          name: "modstaged",
        },
        {
          type: "modified",
          name: "modboth",
        },
        {
          type: "untracked",
          name: "nottracked",
        },
        {
          type: "ignored",
          name: "ignore",
        },
        {
          type: "deleted",
          name: "deleted",
        },
      ],
    );
  });
  it("bunch of valid lines deliver array of change records - even with windows style EOL", () => {
    deepEqual(
      parseStatusLines(
        [
          "R  old -> new",
          "M  modstaged",
          "MM modboth",
          "?? nottracked",
          "!! ignore",
          "D  deleted",
        ].join("\r\n"),
      ),
      [
        {
          type: "renamed",
          name: "new",
          oldName: "old",
        },
        {
          type: "modified",
          name: "modstaged",
        },
        {
          type: "modified",
          name: "modboth",
        },
        {
          type: "untracked",
          name: "nottracked",
        },
        {
          type: "ignored",
          name: "ignore",
        },
        {
          type: "deleted",
          name: "deleted",
        },
      ],
    );
  });
});
