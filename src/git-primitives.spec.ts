/* eslint-disable no-undefined */
import { deepEqual, match, doesNotReject } from "node:assert/strict";
import { EventEmitter } from "node:events";
import { describe, it } from "node:test";
import { getDiffLines, getSHA, getStatusShort } from "./git-primitives.js";

class FakeChildProcess extends EventEmitter {
  stdout: EventEmitter = new EventEmitter();
  stderr: EventEmitter = new EventEmitter();
}

describe("git-primitives - diff --name-status ", () => {
  it("throws in case of an invalid ref", async () => {
    try {
      await getDiffLines("this-is-not-a-real-revision");
    } catch (pError) {
      match(pError.message, /revision 'this-is-not-a-real-revision' unknown/);
    }
  });

  it("throws in case of one or two invalid refs", async () => {
    try {
      await getDiffLines("not-a-revision", "neither-is-this");
    } catch (pError) {
      match(
        pError.message,
        /revision 'not-a-revision' \(or 'neither-is-this'\) unknown/,
      );
    }
  });

  it("does not error in case of a valid ref", (_, pDone) => {
    const lExpected = [
      "M       package.json",
      "M       src/get-diff-lines.mjs",
      "A       src/get-diff-lines.spec.mjs",
    ].join("\n");

    const lChildProcess = new FakeChildProcess();
    const lPromise = getDiffLines(
      "this-is-a-real-branch",
      undefined,
      // @ts-expect-error is only compatible with the spawn call where it matters ...
      () => lChildProcess,
    );
    lChildProcess.stdout.emit("data", lExpected);
    lChildProcess.emit("close", 0);

    lPromise
      .then((pResult) => {
        deepEqual(pResult, lExpected);
        pDone();
      })
      .catch((pError) => {
        pDone(pError);
      });
  });

  it("throws with 'not a git repo' when git detects that", (_, pDone) => {
    const lChildProcess = new FakeChildProcess();
    const lPromise = getDiffLines(
      "main",
      undefined,
      // @ts-expect-error is only compatible with the spawn call where it matters ...
      () => lChildProcess,
    );
    lChildProcess.stderr.emit("data", "scary message");
    lChildProcess.emit("close", 129);

    lPromise
      .then(() => {
        deepEqual("but didn't", "should error");
        pDone();
      })
      .catch((pError) => {
        try {
          match(pError.message, /does not seem to be a git repository/);
          pDone();
        } catch (_pError) {
          pDone(_pError);
        }
      });
  });
});

describe("git-primitives - status", () => {
  it("throws when the 'git' command couldn't be found", (_, pDone) => {
    const lChildProcess = new FakeChildProcess();
    const lPromise = getDiffLines(
      "main",
      undefined,
      // @ts-expect-error is only compatible with the spawn call where it matters ...
      () => lChildProcess,
    );
    lChildProcess.emit("error", { code: "ENOENT" });

    lPromise
      .then(() => {
        deepEqual("but didn't", "should error");
        pDone();
      })
      .catch((pError) => {
        try {
          match(pError.message, /git executable not found/);
          pDone();
        } catch (_pError) {
          pDone(_pError);
        }
      });
  });
  it("throws when something unforeseen happens with spawnSync itself", (_, pDone) => {
    const lChildProcess = new FakeChildProcess();
    const lPromise = getDiffLines(
      "main",
      undefined,
      // @ts-expect-error is only compatible with the spawn call where it matters ...
      () => lChildProcess,
    );
    lChildProcess.emit("error", { code: "HELICOPTER" });

    lPromise
      .then(() => {
        deepEqual("but didn't", "should error");
        pDone();
      })
      .catch((pError) => {
        try {
          match(pError.message, /internal spawn error: /);
          pDone();
        } catch (_pError) {
          pDone(_pError);
        }
      });
  });

  it("throws when the git result contained a non-zero exit code", (_, pDone) => {
    const lChildProcess = new FakeChildProcess();
    const lPromise = getDiffLines(
      "main",
      undefined,
      // @ts-expect-error is only compatible with the spawn call where it matters ...
      () => lChildProcess,
    );
    lChildProcess.stderr.emit("data", Buffer.from("neighbor of the beast"));
    lChildProcess.emit("close", 667);

    lPromise
      .then(() => {
        deepEqual("but didn't", "should error");
        pDone();
      })
      .catch((pError) => {
        try {
          match(
            pError.message,
            /internal git error: 667 \(neighbor of the beast\)/,
          );
          pDone();
        } catch (_pError) {
          pDone(_pError);
        }
      });
  });

  it("throws when the git result contained no exit code at all", (_, pDone) => {
    const lChildProcess = new FakeChildProcess();
    const lPromise = getDiffLines(
      "main",
      undefined,
      // @ts-expect-error is only compatible with the spawn call where it matters ...
      () => lChildProcess,
    );
    lChildProcess.stderr.emit("data", Buffer.from("neighbor of the beast"));
    lChildProcess.emit("close");

    lPromise
      .then(() => {
        deepEqual("but didn't", "should error");
        pDone();
      })
      .catch((pError) => {
        try {
          match(
            pError.message,
            /internal git error: undefined \(neighbor of the beast\)/,
          );
          pDone();
        } catch (_pError) {
          pDone(_pError);
        }
      });
  });

  it("does not throw", () => {
    doesNotReject(getStatusShort());
  });
});

describe("git-primitives - get SHA1", () => {
  it("returns the HEAD's SHA1", async () => {
    match(await getSHA(), /^([a-f0-9]{40})$/);
  });
});
