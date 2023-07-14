import { match } from "node:assert";
import { Writable } from "node:stream";
import { describe, it } from "node:test";
import { cli } from "./cli.js";
import { getSHASync } from "./main.js";

class WritableTestStream extends Writable {
  expected = /^$/;

  constructor(pExpected?: RegExp) {
    super();
    if (pExpected) {
      this.expected = pExpected;
    }
  }
  write(pChunk) {
    match(pChunk, this.expected);
    return true;
  }
}

describe("cli", () => {
  it("shows the version number when asked for", async () => {
    const lOutStream = new WritableTestStream(/^[0-9]+\.[0-9]+\.[0-9]+(-)?.*/);
    const lErrorStream = new WritableTestStream();
    await cli(["-V"], lOutStream, lErrorStream);
    await cli(["--version"], lOutStream, lErrorStream);
  });

  it("shows help when asked for", async () => {
    const lOutStream = new WritableTestStream(
      /^Usage: watskeburt \[options\] \[old-revision\] \[new-revision\].*/
    );
    const lErrorStream = new WritableTestStream();
    await cli(["-h"], lOutStream, lErrorStream);
    await cli(["--help"], lOutStream, lErrorStream);
  });

  it("shows an error when passed a non-existing argument", async () => {
    const lOutStream = new WritableTestStream();
    const lErrorStream = new WritableTestStream(
      /.*ERROR:.*'--thisArgumentDoesNotExist'.*/
    );
    await cli(["--thisArgumentDoesNotExist"], lOutStream, lErrorStream, 0);
  });

  it("shows an error when passed a non-existing revision", async () => {
    const lOutStream = new WritableTestStream();
    const lErrorStream = new WritableTestStream(
      /.*ERROR: revision 'this-is-not-likely-to-be-a-known-revision' unknown.*/
    );
    await cli(
      ["this-is-not-likely-to-be-a-known-revision"],
      lOutStream,
      lErrorStream,
      0
    );
  });

  it("shows an error when passed a non-existing reporter type", async () => {
    const lOutStream = new WritableTestStream();
    const lErrorStream = new WritableTestStream(
      /^error:.*argument 'invalid-reporter-type' is invalid.*/
    );
    await cli(["-T", "invalid-reporter-type"], lOutStream, lErrorStream, 0);
  });

  it("emits ", async () => {
    const lOutStream = new WritableTestStream(/^\[\]/);
    const lErrorStream = new WritableTestStream();
    await cli(
      ["-T", "json", "--trackedOnly", getSHASync(), getSHASync()],
      lOutStream,
      lErrorStream
    );
  });
});
