import { deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { parseDiffLine, parseDiffLines } from "./parse-diff-lines.js";

describe("convert diff line to change object", () => {
  it("recognizes Modified files", () => {
    deepEqual(parseDiffLine("M       test/report/markdown/markdown.spec.mjs"), {
      changeType: "modified",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("recognizes Added files", () => {
    deepEqual(parseDiffLine("A       test/report/markdown/markdown.spec.mjs"), {
      changeType: "added",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("recognizes Renamed files", () => {
    deepEqual(
      parseDiffLine(
        "R066\ttest/report/markdown/markdown.spec.mjs\ttest/report/markdown/markdown-short.spec.mjs",
      ),
      {
        changeType: "renamed",
        name: "test/report/markdown/markdown-short.spec.mjs",
        oldName: "test/report/markdown/markdown.spec.mjs",
      },
    );
  });

  it("recognizes Deleted files", () => {
    deepEqual(parseDiffLine("D\ttest/report/markdown/markdown.spec.mjs"), {
      changeType: "deleted",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("files with an unknown change status", () => {
    deepEqual(parseDiffLine("X\ttest/report/markdown/markdown.spec.mjs"), {
      changeType: "unknown",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("returns an empty object when the line doesn't match", () => {
    deepEqual(parseDiffLine("X"), {});
  });

  it("returns an empty object when the line is empty", () => {
    deepEqual(parseDiffLine(""), {});
  });
});

describe("convert a bunch of diff lines to an array of change objects", () => {
  it("empty string delivers an empty array", () => {
    deepEqual(parseDiffLines(""), []);
  });

  it("string with invalid line(s) only delivers an empty array", () => {
    deepEqual(parseDiffLines("X\t\n"), []);
  });

  it("bunch of valid lines deliver array of change records", () => {
    deepEqual(
      parseDiffLines(["A\tthisjusadded", "R100\tfrom\tto"].join("\n")),
      [
        {
          changeType: "added",
          name: "thisjusadded",
        },
        {
          changeType: "renamed",
          name: "to",
          oldName: "from",
        },
      ],
    );
  });
});
