/* eslint-disable no-undefined */
/* eslint-disable unicorn/consistent-function-scoping */
import { deepEqual, doesNotThrow, throws, match } from "node:assert";
import { describe, it } from "node:test";
import {
  getDiffLinesSync,
  getSHASync,
  getStatusShortSync,
} from "./git-primitives-sync.js";

describe("git-primitives-sync - diff --name-status ", () => {
  it("throws in case of an invalid ref", () => {
    throws(
      () => {
        getDiffLinesSync("this-is-not-a-real-revision");
      },
      { message: /revision 'this-is-not-a-real-revision' unknown/ },
    );
  });

  it("throws in case of one or two invalid refs", () => {
    throws(
      () => {
        getDiffLinesSync("not-a-revision", "neither-is-this");
      },
      { message: "revision 'not-a-revision' (or 'neither-is-this') unknown" },
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
      const lResult = getDiffLinesSync(
        "this-is-a-real-branch",
        undefined,
        fakeSpawnSync,
      );
      deepEqual(lExpected, lResult);
    });
  });

  it("requests for a diff between revision and working tree when passed one argument", () => {
    const lExpected = ["git", "diff", "this-is-a-real-branch", "--name-status"];
    function fakeSpawnSync(pCommand: string, pArguments: string[]) {
      return {
        stdout: [pCommand].concat(pArguments),
        status: 0,
      };
    }
    const lResult = getDiffLinesSync(
      "this-is-a-real-branch",
      undefined,
      fakeSpawnSync,
    );
    deepEqual(lExpected, lResult);
  });

  it("requests for a diff between two revisions when passed two arguments", () => {
    const lExpected = [
      "git",
      "diff",
      "this-is-a-real-branch",
      "this-is-a-newer-branch",
      "--name-status",
    ];
    function fakeSpawnSync(pCommand, pArguments) {
      return {
        stdout: [pCommand].concat(pArguments),
        status: 0,
      };
    }
    const lResult = getDiffLinesSync(
      "this-is-a-real-branch",
      "this-is-a-newer-branch",
      fakeSpawnSync,
    );
    deepEqual(lExpected, lResult);
  });

  it("throws with 'not a git repo' when git detects that", () => {
    function fakeSpawnSync() {
      return { status: 129 };
    }
    throws(
      () => {
        getDiffLinesSync("main", undefined, fakeSpawnSync);
      },
      { message: /does not seem to be a git repository/ },
    );
  });
});

describe("git-primitives-sync - status", () => {
  it("throws when the 'git' command couldn't be found", () => {
    function fakeSpawnSync() {
      return { status: null, stderr: null, error: { code: "ENOENT" } };
    }
    throws(
      () => {
        getStatusShortSync(fakeSpawnSync);
      },
      { message: "git executable not found" },
    );
  });

  it("throws when something unforeseen happens with spawnSync itself", () => {
    function fakeSpawnSync() {
      return { status: null, stderr: null, error: { code: "HELICOPTER" } };
    }
    throws(
      () => {
        getStatusShortSync(fakeSpawnSync);
      },
      { message: /internal spawn error: / },
    );
  });

  it("throws when the git result contained a non-zero exit code", () => {
    function fakeSpawnSync() {
      return { status: 667, stderr: Buffer.from("neighbor of the beast") };
    }
    throws(
      () => {
        getStatusShortSync(fakeSpawnSync);
      },
      { message: "internal git error: 667 (neighbor of the beast)" },
    );
  });

  it("throws when the git result contained no exit code at all", () => {
    function fakeSpawnSync() {
      return { stderr: Buffer.from("neighbor of the beast") };
    }
    throws(
      () => {
        getStatusShortSync(fakeSpawnSync);
      },
      { message: "internal git error: undefined (neighbor of the beast)" },
    );
  });

  it("throws with 'not a git repo' when git detects that", () => {
    function fakeSpawnSync() {
      return { status: 129 };
    }
    throws(
      () => {
        getStatusShortSync(fakeSpawnSync);
      },
      { message: /does not seem to be a git repository/ },
    );
  });

  it("does not throw", () => {
    doesNotThrow(() => {
      getStatusShortSync();
    });
  });
});

describe("git-primitives-sync - get SHA1", () => {
  it("returns the HEAD's SHA1", () => {
    match(getSHASync(), /^([a-f0-9]{40})$/);
  });
});
