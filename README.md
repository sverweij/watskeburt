# watskeburt

get git changed files & their statuses since _any revision_

## what's this do?

A micro-lib to retrieve an array of file names that were changed (added,
modified, renamed, deleted, ...) since the revision it got passed. Also
sports a cli for use outside of JavaScript c.s.

- :warning: in the process of getting 'production ready'. It's automatically
  tested + it's using itself - but a bunch of static analysis and a bit of
  automation still needs be added.
- :warning: Interface is stable-ish, but can can change until 1.0.0 is published
- :warning: expect some rough edges for e.g. error scenarios

## why?

Useful primitives to support e.g. auto-documenting pull requests, or to save
processing power by only doing static analysis only over stuff that is changed.

There are a few packages like these like this on npm, but it seems they've
fallen out of maintenance. More generic packages don't get plagued by this
but for just this simple usage they're a bit overkill.

## usage

### :shell: cli

For now there's also a simple command line interface

```shell
# list all JavaScript-ish files changed since main in a regular expression
$ npx watskeburt main
^(src/cli.mjs|src/formatters/regex.mjs|src/version.mjs)$
```

By default this returns a regex that contains all changed files that could be
source files in the JavaScript ecosystem (.js, .mjs, .ts, .tsx ...) that can
be used in e.g. the `--focus` filter of dependency-cruiser:

```
Usage: cli [options] <revision>

lists files & their statuses since <revision>

Options:
-V, --version output the version number
-T, --output-type <type> json,regex (default: "regex")
--tracked-only only take tracked files into account (default: false)
-h, --help display help for command

```

### :scroll: API

```javascript
// const { list } = require('watskeburt'); // will work in commonjs  contexts  as well
import { list, getSHA } from "watskeburt";

// print the SHA1 of the current HEAD
console.log(getSHA());

// list all files that differ between 'main' and
/** @type {import('watskeburt').IChange[]} */
const lChangedFiles = list("main");
```

An array of changes looks something like this:

```javascript
[
  { name: "doc/cli.md", changeType: "modified" },
  {
    name: "test/thing.spec.mjs",
    changeType: "renamed",
    oldName: "test/old-thing.spec.mjs",
  },
  { name: "src/not-tracked-yet.mjs", changeType: "untracked" },
];
```

## 🇳🇱 'watskeburt'??

_watskeburt_ is a fast pronunciation of the Dutch sentence "Wat is er gebeurd?"
(What has happened?), as well as the title of a song by the Dutch hip hop group
"De Jeugd van Tegenwoordig".
