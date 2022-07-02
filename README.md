# diff-dat

get git changed files since _any reference_

## what's this do?

A micro-lib to retrieve an array of file names that were changed (added,
modified, renamed, deleted, ...) since the reference it got passed.

## sample return value

```json
[
  { "name": "doc/cli.md", "changeType": "modified" },
  {
    "name": "test/report/mermaid/mermaid.spec.mjs",
    "changeType": "renamed",
    "oldName": "test/configs/plugins/mermaid-reporter-plugin/module-level/index.spec.mjs",
    "similarity": 66
  },
  { "name": "src/not-tracked-yet.mjs", "changeType": "untracked" }
  // ...
]
```

## cli

For now there's also a simple command line interface

```
Usage: diff-dat [options] <reference>

lists files since <reference>

Options:
  -T, --output-type <type>  json,regex (default: "regex")
  --tracked-only            only take tracked files into account (default: false)
  -h, --help                display help for command

```
