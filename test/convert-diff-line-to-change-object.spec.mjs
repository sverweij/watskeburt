import { deepEqual } from "node:assert";
import convertLine from "../src/convert-diff-line-to-change-object.mjs";

describe("convert diff line to change object", () => {
  it("recognizes Modified files", () => {
    deepEqual(convertLine("M       test/report/markdown/markdown.spec.mjs"), {
      changeType: "modified",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("recognizes Modified files", () => {
    deepEqual(convertLine("A       test/report/markdown/markdown.spec.mjs"), {
      changeType: "added",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("recognizes Renamed files", () => {
    deepEqual(
      convertLine(
        "R066    test/report/markdown/markdown.spec.mjs        test/report/markdown/markdown-short.spec.mjs"
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
    deepEqual(convertLine("D       test/report/markdown/markdown.spec.mjs"), {
      changeType: "deleted",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("recognizes Added files", () => {
    deepEqual(convertLine("A       test/report/markdown/markdown.spec.mjs"), {
      changeType: "added",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });

  it("files with an unknown change status", () => {
    deepEqual(convertLine("X       test/report/markdown/markdown.spec.mjs"), {
      changeType: "unknown",
      name: "test/report/markdown/markdown.spec.mjs",
    });
  });
});
