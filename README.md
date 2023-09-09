# watskeburt

Get changed files & their statuses since any git _revision_

## what's this do?

A micro-lib to retrieve an array of file names that were changed since a
revision. Also sports a cli for use outside of JavaScript c.s.

## why?

I needed something simple and robust to support some upcoming features in
[dependency-cruiser](https://github.com/sverweij/dependency-cruiser) and to
run standalone to use _in combination_ with dependency-cruiser.

There are a few specialized packages like this on npm, but it seems they've
fallen out of maintenance. More generic packages are still maintained,
but for just this simple usage they're a bit overkill.

## :construction_worker: usage

### :scroll: API

```javascript
import { list, getSHA } from "watskeburt";

// print the SHA1 of the current HEAD
console.log(await getSHA());

// list all files that differ between 'main' and the current revision (including
// files not staged for commit and files not under revision control)
/** @type {import('watskeburt').IChange[]} */
const lChangedFiles = await list("main");

// list all files that differ between 'v0.6.1' and 'v0.7.1' (by definition
// won't include files staged for commit and/ or not under revision control)
/** @type {import('watskeburt').IChange[]} */
const lChangedFiles = await list("v0.6.1", "v0.7.1");

// As a third parameter you can pass some options
// (pass null as the second parameter if you only want to compare between
// a revision and the working tree):
/** @type {import('watskeburt').IChange[]|string} */
const lChangedFiles = await list("main", null, {
  trackedOnly: false, // when set to true leaves out files not under revision control
  outputType: "object", // other options: "json" and "regex" (as used in the CLI)
});
```

The array of changes this returns looks like this:

```javascript
[
  {
    name: "doc/cli.md",
    changeType: "modified",
  },
  {
    name: "test/thing.spec.mjs",
    changeType: "renamed",
    oldName: "test/old-thing.spec.mjs",
  },
  {
    name: "src/not-tracked-yet.mjs",
    changeType: "untracked",
  },
];
```

### :shell: cli

For now there's also a simple command line interface (which works from node ^16.19 and
node >=18.11).

```shell
# list all JavaScript-ish files changed since main in a regular expression
$ npx watskeburt main
^(src/cli\.mjs|src/formatters/regex\.mjs|src/version\.mjs)$
```

By default this returns a regex that contains all changed files that could be
source files in the JavaScript ecosystem (.js, .mjs, .ts, .tsx ...) that can
be used in e.g. the `--focus` and `--reaches` filters of dependency-cruiser.

The JSON output (which looks a lot like the array above) is unfiltered and
also contains other extensions.

```
Usage: watskeburt [options] [old-revision] [new-revision]

lists files & their statuses since [old-revision] or between [old-revision] and [new-revision].

-> When you don't pass a revision at all old-revision defaults to the current one.

Options:
  -T, --outputType <type>  what format to emit (choices: "json", "regex", default: "regex")
  --trackedOnly            only take tracked files into account (default: false)
  -V, --version            output the version number
  -h, --help               display help for command
```

## 🇳🇱 what does 'watskeburt' mean?

Wazzup.

_watskeburt_ is a fast pronunciation of the Dutch "wat is er gebeurd?"
(_what has happened?_) or "wat er is gebeurd" (_what has happened_). It's
also the title of a song by the Dutch band "De Jeugd van Tegenwoordig"
(_Youth these days_).
