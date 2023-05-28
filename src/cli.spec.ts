import { match } from "node:assert";
import { Writable } from "node:stream";
import { getSHASync } from "./main.js";
import { cli } from "./cli.js";

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
    // @ts-expect-error can't assign WritableTestSTream to WriteStream
    await cli(["-V"], lOutStream, lErrorStream);
    // @ts-expect-error can't assign WritableTestSTream to WriteStream
    await cli(["--version"], lOutStream, lErrorStream);
  });

  it("shows help when asked for", async () => {
    const lOutStream = new WritableTestStream(
      /^Usage: watskeburt \[options\] \[old-revision\] \[new-revision\].*/
    );
    const lErrorStream = new WritableTestStream();
    // @ts-expect-error can't assign WritableTestSTream to WriteStream
    await cli(["-h"], lOutStream, lErrorStream);
    // @ts-expect-error can't assign WritableTestSTream to WriteStream
    await cli(["--help"], lOutStream, lErrorStream);
  });

  it("shows an error when passed a non-existing argument", async () => {
    const lOutStream = new WritableTestStream();
    const lErrorStream = new WritableTestStream(
      /.*ERROR:.*'--thisArgumentDoesNotExist'.*/
    );
    // @ts-expect-error can't assign WritableTestSTream to WriteStream
    await cli(["--thisArgumentDoesNotExist"], lOutStream, lErrorStream);
  });

  it("shows an error when passed a non-existing revision", async () => {
    const lOutStream = new WritableTestStream();
    const lErrorStream = new WritableTestStream(
      /.*ERROR: revision 'this-is-not-likely-to-be-a-known-revision' unknown.*/
    );
    await cli(
      ["this-is-not-likely-to-be-a-known-revision"],
      // @ts-expect-error can't assign WritableTestSTream to WriteStream
      lOutStream,
      lErrorStream
    );
  });

  it("shows an error when passed a non-existing reporter type", async () => {
    const lOutStream = new WritableTestStream();
    const lErrorStream = new WritableTestStream(
      /^error:.*argument 'invalid-reporter-type' is invalid.*/
    );
    await cli(
      ["-T", "invalid-reporter-type"],
      // @ts-expect-error can't assign WritableTestSTream to WriteStream
      lOutStream,
      lErrorStream
    );
  });

  it("emits ", async () => {
    const lOutStream = new WritableTestStream(/^\[\]/);
    const lErrorStream = new WritableTestStream();
    await cli(
      ["-T", "json", "--trackedOnly", getSHASync(), getSHASync()],
      // @ts-expect-error can't assign WritableTestSTream to WriteStream
      lOutStream,
      lErrorStream
    );
  });
});
