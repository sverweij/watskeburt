# watskeburt

get git changed files & their statuses since _any revision_

## what's this do?

A micro-lib to retrieve an array of file names that were changed (added,
modified, renamed, deleted, ...) since the reference it got passed.

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

### cli

For now there's also a simple command line interface

```
Usage: cli [options] <revision>

lists files & their statuses since <revision>

Options:
  -V, --version             output the version number
  -T, --output-type <type>  json,regex (default: "regex")
  --tracked-only            only take tracked files into account (default: false)
  -h, --help                display help for command
```

By default this returns a regex that contains all changed files that could be
source files in the JavaScript ecosystem (.js, .mjs, .ts, .tsx ...) that can
be used in e.g. the `--focus` filter of dependency-cruiser:

```
^(src/cli.mjs|src/formatters/regex.mjs|src/version.mjs)$
```

### API

```javascript
// const { convert } = require('watskeburt'); // will work in commonjs  contexts  as well
import { convert } from "watskeburt";

// list all files that differ between 'main' and
/** @type {import('watskeburt').IChange[]} */
const lChangedFiles = convert("main");
```

An array of changes looks something like this:

```javascript
[
  { name: "doc/cli.md", changeType: "modified" },
  {
    name: "test/thing.spec.mjs",
    changeType: "renamed",
    oldName: "test/oldthing.spec.mjs",
    similarity: 66,
  },
  { name: "src/not-tracked-yet.mjs", changeType: "untracked" },
];
```

## What's the deal with the name?

_watskeburt_ is a fast pronunciation of the Dutch sentence "Wat is er gebeurd?"
(What has happened?), as well as the title of a song by the Dutch hip hop group
"De Jeugd van Tegenwoordig".
