# watskeburt

get git changed files & their statuses since _any reference_

## what's this do?

A micro-lib to retrieve an array of file names that were changed (added,
modified, renamed, deleted, ...) since the reference it got passed.

- :warning: in the process of getting 'production ready'. It's automatically
  tested + it's using itself - but a bunch of static analysis and a bit of
  automation still needs be added.
- :warning: Interface is stable-ish, but can can change until 1.0.0 is published
- :warning: expect some rough edges for e.g. error scenarios

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
Usage: watskeburt [options] <reference>

lists files & their statuses since <reference>

Options:
  -T, --output-type <type>  json,regex (default: "regex")
  --tracked-only            only take tracked files into account (default: false)
  -h, --help                display help for command

```
