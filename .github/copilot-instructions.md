# Copilot Instructions

## Project overview

`watskeburt` is a TypeScript/Node.js library and CLI that lists files changed since a git revision. It wraps `git diff --name-status` and `git status --porcelain`, parses the output, and returns structured `IChange[]` or formatted strings (`regex` | `json`).

## Commands

```sh
npm --run=test               # run all tests (uses Node.js built-in runner via tsx)
node --run=test:cover        # tests with c8 coverage
node --run=lint              # format:check + eslint + tsc --noEmit (in parallel)
node --run=lint:fix          # auto-fix format and eslint issues
node --run=build             # clean → emit version → tsc → prettier on dist/
node --run=check             # lint + depcruise + test:cover (full CI equivalent)
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
dist/                     # tsc output (committed, shipped in npm package)
```

The flow for a `list()` call: `main.ts` → calls `git-primitives.ts` → raw strings are parsed by `parse-diff-lines.ts` / `parse-status-lines.ts` → optionally formatted by `format/`.

## Key conventions

**Naming prefixes** (enforced by `eslint-plugin-budapestian`):
- Parameters: `p` prefix — `pOptions`, `pArguments`, `pSpawnFunction`
- Local variables: `l` prefix — `lResult`, `lChanges`, `lErrorMap`

**Imports**: Always use `.js` extensions for local imports (NodeNext module resolution), even for `.ts` source files:
```ts
import { parseDiffLines } from "./parse-diff-lines.js";
```

**Testability via dependency injection**: `git-primitives.ts` functions accept an optional `pSpawnFunction = spawn` parameter, allowing tests to inject a mock `spawn`.

**Tests**: Co-located `*.spec.ts` files. Use Node.js built-in `node:test` (`describe`, `it`, `before`, `after`) and `node:assert/strict`. No third-party test framework.

**ESM only**: `"type": "module"` in package.json. No CommonJS.

**Public types**: `types/watskeburt.d.ts` is hand-maintained and is the authoritative source for the public API shape. It is *not* generated from source.

**Dependency rules**: `dependency-cruiser` enforces module boundaries. Run `node --run=depcruise` to validate. Don't import from `dist/` in `src/`.
