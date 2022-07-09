import { deepEqual, doesNotThrow, throws, match } from "node:assert";
import { getDiffLines, getSHA1, getStatusShort } from "./git-primitives.mjs";

describe("git-primitives - diff --name-status ", () => {
  it("throws in case of an invalid ref", async () => {
    throws(
      () => {
        getDiffLines("this-is-not-a-real-revision");
      },
      { message: /revision 'this-is-not-a-real-revision' unknown/ }
    );
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

  it("throws with 'not a git repo' when git detects that", async () => {
    function fakeSpawnSync() {
      return { status: 129 };
    }
    throws(
      () => {
        getDiffLines(fakeSpawnSync, fakeSpawnSync);
      },
      { message: /does not seem to be a git repository/ }
    );
  });
});

describe("git-primitives - status", () => {
  it("throws when the 'git' command couldn't be found", async () => {
    function fakeSpawnSync() {
      return { status: null, stderr: null, error: { code: "ENOENT" } };
    }
    throws(
      () => {
        getStatusShort(fakeSpawnSync);
      },
      { message: "git executable not found" }
    );
  });

  it("throws when something unforeseen happens with spawnSync itself", async () => {
    function fakeSpawnSync() {
      return { status: null, stderr: null, error: { code: "HELICOPTER" } };
    }
    throws(
      () => {
        getStatusShort(fakeSpawnSync);
      },
      { message: /internal spawn error: / }
    );
  });

  it("throws when the git result contained a non-zero exit code", async () => {
    function fakeSpawnSync() {
      return { status: 667, stderr: Buffer.from("neighbor of the beast") };
    }
    throws(
      () => {
        getStatusShort(fakeSpawnSync);
      },
      { message: "internal git error: 667 (neighbor of the beast)" }
    );
  });

  it("throws with 'not a git repo' when git detects that", async () => {
    function fakeSpawnSync() {
      return { status: 129 };
    }
    throws(
      () => {
        getStatusShort(fakeSpawnSync);
      },
      { message: /does not seem to be a git repository/ }
    );
  });

  it("does not throw", () => {
    doesNotThrow(() => {
      getStatusShort();
    });
  });
});

describe("git-primitives - get SHA1", () => {
  it("returns the HEAD's SHA1", () => {
    match(getSHA1(), /^([a-f0-9]{40})$/);
  });
});
