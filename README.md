# watskeburt

get git changed files & their statusses since _any reference_

## what's this do?

A micro-lib to retrieve an array of file names that were changed (added,
modified, renamed, deleted, ...) since the reference it got passed.

- :warning: NOT yet published on npm
- :warning: in the process of getting 'production ready'. It's automatically
  tested + it's using itself + interface is stable - but a bunch of static
  analysis still needs be added, as well as a commonjs version.
- :warning: currently esm only - commonjs compiledown will follow as part of the
  previous point.

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

lists files since <reference>

Options:
  -T, --output-type <type>  json,regex (default: "regex")
  --tracked-only            only take tracked files into account (default: false)
  -h, --help                display help for command

```
