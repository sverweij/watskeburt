import { deepEqual, doesNotThrow, throws } from "node:assert";
import { getDiffLines, getStatusShort } from "./get-diff-lines.mjs";

describe("get diff lines - diff --name-status ", () => {
  it("throws in case of an invalid ref", async () => {
    throws(() => {
      getDiffLines("this-is-not-a-real-reference");
    });
  });

  it("does not error in case of a valid ref", () => {
    const lExpected = [
      "M       package.json",
      "M       src/get-diff-lines.mjs",
      "A       src/get-diff-lines.spec.mjs",
    ].join("\n");
    function fakeSpawnSync() {
      return {
        status: 0,
        stdout: lExpected,
      };
    }
    doesNotThrow(() => {
      const lResult = getDiffLines("this-is-a-real-branch", fakeSpawnSync);
      deepEqual(lExpected, lResult);
    });
  });
});

describe("get diff lines - status", () => {
  it("throws when the git result contained an error", async () => {
    function fakeSpawnSync() {
      return { error: "an error" };
    }
    throws(() => {
      getStatusShort(fakeSpawnSync);
    });
  });
  it("throws when the git result contained a non-zero exit code", async () => {
    function fakeSpawnSync() {
      return { status: 666 };
    }
    throws(() => {
      getStatusShort(fakeSpawnSync);
    });
  });

  it("does not throw", () => {
    doesNotThrow(() => {
      getStatusShort();
    });
  });
});
