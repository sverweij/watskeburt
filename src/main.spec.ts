import { deepEqual, match } from "node:assert";
import { unlinkSync, writeFileSync } from "node:fs";
import { after, before, describe, it } from "node:test";
import { IChange } from "../types/watskeburt.js";
import { getSHA, getSHASync, list, listSync } from "./main.js";

const UNTRACKED_FILE_NAME = "src/__fixtures__/untracked.txt";

describe("main - list & listSync ", () => {
  // "create an untracked file"
  before(() => {
    writeFileSync(
      UNTRACKED_FILE_NAME,
      "temporary file for testing purposes, untracked",
      { encoding: "utf8" }
    );
  });

  // "remove the untracked file";
  after(() => {
    try {
      unlinkSync(UNTRACKED_FILE_NAME);
    } catch (pError) {
      process.stderr.write(
        "cleaning up untracked file failed in test 'main - list & listSync'\n"
      );
    }
  });

  it("list (trackedOnly) returns an empty array when comparing current SHA, with current SHA", async () => {
    const lResult = await list(getSHASync(), getSHASync(), {
      trackedOnly: true,
    });
    deepEqual(lResult, []);
  });

  it("listSync (trackedOnly) returns an empty array when comparing current SHA, with current SHA", () => {
    const lResult = listSync(getSHASync(), getSHASync(), {
      trackedOnly: true,
    });
    deepEqual(lResult, []);
  });

  it("list result contains the newly created untracked file when comparing current SHA, with current SHA", async () => {
    const lResult = (await list(getSHASync(), getSHASync())) as IChange[];
    deepEqual(
      lResult.filter(({ name }) => name === UNTRACKED_FILE_NAME),
      [
        {
          name: UNTRACKED_FILE_NAME,
          changeType: "untracked",
        },
      ]
    );
  });

  it("listSync result contains the newly created untracked file when comparing current SHA, with current SHA", () => {
    const lResult = listSync(getSHASync(), getSHASync()) as IChange[];
    deepEqual(
      lResult.filter(({ name }) => name === UNTRACKED_FILE_NAME),
      [
        {
          name: UNTRACKED_FILE_NAME,
          changeType: "untracked",
        },
      ]
    );
  });

  it("list result contains the newly created untracked file", async () => {
    const lResult = (await list()) as IChange[];
    deepEqual(
      lResult.filter(({ name }) => name === UNTRACKED_FILE_NAME),
      [
        {
          name: UNTRACKED_FILE_NAME,
          changeType: "untracked",
        },
      ]
    );
  });

  it("listSync result contains the newly created untracked file", () => {
    const lResult = listSync() as IChange[];
    deepEqual(
      lResult.filter(({ name }) => name === UNTRACKED_FILE_NAME),
      [
        {
          name: UNTRACKED_FILE_NAME,
          changeType: "untracked",
        },
      ]
    );
  });
});

describe("main - sha & shaSync", () => {
  it("getSHA returns something SHA1 looking", async () => {
    const lSha = await getSHA();

    match(lSha, /^[a-f0-9]{40}$/);
  });

  it("getSHASync returns something SHA1 looking", () => {
    const lSha = getSHASync();
    match(lSha, /^[a-f0-9]{40}$/);
  });
});
