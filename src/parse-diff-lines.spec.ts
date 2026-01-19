import { deepEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { parseDiffLine, parseDiffLines } from "./parse-diff-lines.js";

describe("convert diff line to change object", () => {
  it("recognizes Modified files", () => {
    deepEqual(parseDiffLine("M       test/report/markdown/markdown.spec.mjs"), {
      type: "modified",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("recognizes Added files", () => {
    deepEqual(parseDiffLine("A       test/report/markdown/markdown.spec.mjs"), {
      type: "added",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("recognizes Renamed files", () => {
    deepEqual(
      parseDiffLine(
        "R066\ttest/report/markdown/markdown.spec.mjs\ttest/report/markdown/markdown-short.spec.mjs",
      ),
      {
        type: "renamed",
        name: "test/report/markdown/markdown-short.spec.mjs",
        oldName: "test/report/markdown/markdown.spec.mjs",
      },
    );
  });

  it("recognizes Deleted files", () => {
    deepEqual(parseDiffLine("D\ttest/report/markdown/markdown.spec.mjs"), {
      type: "deleted",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("files with an unknown change status", () => {
    deepEqual(parseDiffLine("X\ttest/report/markdown/markdown.spec.mjs"), {
      type: "unknown",
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
          type: "added",
          name: "thisjusadded",
        },
        {
          type: "renamed",
          name: "to",
          oldName: "from",
        },
      ],
    );
  });

  it("bunch of valid lines deliver array of change records - even with windows style EOL", () => {
    deepEqual(
      parseDiffLines(["A\tthisjusadded", "R100\tfrom\tto"].join("\r\n")),
      [
        {
          type: "added",
          name: "thisjusadded",
        },
        {
          type: "renamed",
          name: "to",
          oldName: "from",
        },
      ],
    );
  });

  it("handles trailing whitespace without ReDoS vulnerability", () => {
    deepEqual(parseDiffLine("M\tfilename.txt "), {});
    deepEqual(parseDiffLine("M\tfilename.txt\t"), {});
    deepEqual(parseDiffLine("M\tfilename.txt   \t  "), {});
  });

  it("handles long trailing whitespace without ReDoS vulnerability", () => {
    const longWhitespace = " ".repeat(1000);
    deepEqual(parseDiffLine(`M\tfilename.txt${longWhitespace}`), {});
  });

  it("correctly parses renamed files with tab separator", () => {
    deepEqual(parseDiffLine("R100\told.txt\tnew.txt"), {
      type: "renamed",
      name: "new.txt",
      oldName: "old.txt",
    });
  });

  it("correctly parses renamed files with space separator", () => {
    deepEqual(parseDiffLine("R100 oldname.txt newname.txt"), {
      type: "renamed",
      name: "newname.txt",
      oldName: "oldname.txt",
    });
  });
});
