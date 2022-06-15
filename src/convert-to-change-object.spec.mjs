import { deepEqual } from "node:assert";
import {
  convertDiffLine,
  convertDiffLines,
} from "./convert-to-change-object.mjs";

describe("convert diff line to change object", () => {
  it("recognizes Modified files", () => {
    deepEqual(
      convertDiffLine("M       test/report/markdown/markdown.spec.mjs"),
      {
        changeType: "modified",
        name: "test/report/markdown/markdown.spec.mjs",
      }
    );
  });

  it("recognizes Modified files", () => {
    deepEqual(
      convertDiffLine("A       test/report/markdown/markdown.spec.mjs"),
      {
        changeType: "added",
        name: "test/report/markdown/markdown.spec.mjs",
      }
    );
  });

  it("recognizes Renamed files", () => {
    deepEqual(
      convertDiffLine(
        "R066\ttest/report/markdown/markdown.spec.mjs\ttest/report/markdown/markdown-short.spec.mjs"
      ),
      {
        changeType: "renamed",
        similarity: 66,
        name: "test/report/markdown/markdown-short.spec.mjs",
        oldName: "test/report/markdown/markdown.spec.mjs",
      }
    );
  });

  it("recognizes Deleted files", () => {
    deepEqual(convertDiffLine("D\ttest/report/markdown/markdown.spec.mjs"), {
      changeType: "deleted",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("recognizes Added files", () => {
    deepEqual(
      convertDiffLine("A       test/report/markdown/markdown.spec.mjs"),
      {
        changeType: "added",
        name: "test/report/markdown/markdown.spec.mjs",
      }
    );
  });

  it("files with an unknown change status", () => {
    deepEqual(convertDiffLine("X\ttest/report/markdown/markdown.spec.mjs"), {
      changeType: "unknown",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("returns an empty object when the line doesn't match", () => {
    deepEqual(convertDiffLine("X"), {});
  });

  it("returns an empty object when the line is empty", () => {
    deepEqual(convertDiffLine(""), {});
  });
});

describe("convert a bunch of diff lines to an array of change objects", () => {
  it("empty string delivers an empty array", () => {
    deepEqual(convertDiffLines(""), []);
  });

  it("string with invalid line(s) only delivers an empty array", () => {
    deepEqual(convertDiffLines("X\t\n"), []);
  });

  it("bunch of valid lines deliver array of change records", () => {
    deepEqual(convertDiffLines("A\tthisjusadded\nR100\tfrom\tto\n"), [
      {
        changeType: "added",
        name: "thisjusadded",
      },
      {
        changeType: "renamed",
        name: "to",
        oldName: "from",
        similarity: 100,
      },
    ]);
  });
});
