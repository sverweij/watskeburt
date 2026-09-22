# Agent Instructions

## Project overview

`watskeburt` is a TypeScript/Node.js library and CLI that lists files changed since a git revision. It wraps `git diff --name-status` and `git status --porcelain`, parses the output, and returns structured `IChange[]` or formatted strings (`regex` | `json`).

## Commands

```sh
node --run=test               # run all tests (uses Node.js built-in runner via tsx)
node --run=test:cover        # tests with c8 coverage
node --run=lint              # format:check + oxlint + tsc --noEmit (in parallel)
node --run=lint:fix          # auto-fix formatting and oxlint issues
node --run=build             # clean → emit version → tsc → prettier on dist/
node --run=check             # format + lint + depcruise + test:cover (full local quality check)
node --run=depcruise         # validate dependency rules
```

**Run a single test file:**

```sh
npx tsx --test src/parse-diff-lines.spec.ts
```

## Architecture

```
src/
  git-primitives.ts       # spawn("git", ...) wrappers — only place that touches the OS
  parse-diff-lines.ts     # parses `git diff --name-status` output → IChange[]
  parse-status-lines.ts   # parses `git status --porcelain` output → IChange[]
  map-change-type.ts      # maps single-letter git codes (A/C/D/M/R…) to changeType
  main.ts                 # public API: list() and getSHA()
  cli.ts                  # parseArgs + calls list(), writes to streams
  run-cli.ts              # bin entry point
  format/
    format.ts             # dispatches to regex.ts or json.ts
    regex.ts              # formats IChange[] as a regex string
    json.ts               # formats IChange[] as JSON
types/
  watskeburt.d.ts         # hand-maintained public API types (source of truth for the API)
dist/                     # generated with node --run=build (tsc output, shipped in npm package, intentionally version controlled)
```

The flow for a `list()` call: `main.ts` → calls `git-primitives.ts` → raw strings are parsed by `parse-diff-lines.ts` / `parse-status-lines.ts` → optionally formatted by `format/`.

## Key conventions

**Naming prefixes** :

- Parameters: `p` prefix — `pOptions`, `pArguments`, `pSpawnFunction`
- Local variables: `l` prefix — `lResult`, `lChanges`, `lErrorMap`
- Constants: in uppercase - `OUTPUT_TYPE_TO_FUNCTION`

**Imports**: Always use `.js` extensions for local imports (NodeNext module resolution), even for `.ts` source files:

```ts
import { parseDiffLines } from "./parse-diff-lines.js";
```

**Testability via dependency injection**: `git-primitives.ts` functions accept an optional `pSpawnFunction = spawn` parameter, allowing tests to inject a mock `spawn`.

**Tests**: Co-located `*.spec.ts` files. Use Node.js built-in `node:test` (`describe`, `it`, `before`, `after`) and `node:assert/strict`. No third-party test framework.

**ESM only**: `"type": "module"` in package.json. No CommonJS.

**Public types**: `types/watskeburt.d.ts` is hand-maintained and is the authoritative source for the public API shape. It is _not_ generated from source.

**Dependency rules**: `dependency-cruiser` enforces module boundaries. Run `node --run=depcruise` to validate. Don't import from `dist/` in `src/`.

**Release publishing**: don't - leave this exclusively to a human maintainer.

**Hygiene**: After implementing any change ALWAYS run `node --run=build` and `node --run=check` and fix any errors and warnings it generates. Update the Architecture section in AGENTS.md when changes were made (or are detected) that make them out of sync with reality. New or changed behavior should include covering tests, matching CONTRIBUTING.md.
