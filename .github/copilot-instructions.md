# Copilot Instructions for watskeburt

Be brief in all responses.

## Module System
- Use ES Modules (ESM) exclusively
- Always use `.js` extension in imports, even for TypeScript files
- Use Node.js native modules with `node:` prefix (e.g., `import { readFile } from "node:fs/promises"`)

## TypeScript
- Target: ESNext
- Strict type checking enabled
- Types in `/types` directory (`.d.ts` files)
- Define explicit return types for functions

## Testing
- Tests use Node.js native test runner (`node:test`)
- Name test files with `.spec.ts` suffix
- Use `node:assert/strict` for assertions
- Each module should have a corresponding test file

## Formatting
- Maximum complexity of 10
- No magic numbers (except in tests)
- Prefer Node.js protocols

## Structure
- Source code in `/src`
- Tests alongside source files
- Types in `/types`

## Response Style
- Be as brief as possible
- Focus on solutions, not explanations
- Prefer code examples over descriptions
- Follow existing code patterns
