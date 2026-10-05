# ternTS

TypeScript to JavaScript, exactly like `tsc`, but much faster. For any TypeScript project:
Node servers, React and JSX, libraries, decorators (NestJS, TypeORM, Angular) and all.

Written in [Tern](https://ternlang.dev). Try it in your browser: [ternlang.dev/ts](https://ternlang.dev/ts/)

```sh
npm i -D @ternlang/ternts@experimental
```

## Benchmarks

| | VS Code (13,454 files) | NestJS (1,959 files) |
|---|---|---|
| **ternTS** | **1.33 s** | **32 ms** |
| swc | 6.07 s | 202 ms |
| tsgo | 22.2 s | 624 ms |
| tsc | 40.2 s | 1.44 s |

## Usage

```sh
npx ternts build          # builds the project in tsconfig.json
npx ternts dev --warm     # build, run, and restart on save
```

- Jest: `transform: { '^.+\\.tsx?$': '@ternlang/ternts/jest' }`
- Vitest: `plugins: [ternts()]` from `@ternlang/ternts/vite`
- Node: `node --import @ternlang/ternts/register src/main.ts`

## Status

Experimental. Tested on VS Code, Grafana, Excalidraw, NestJS, Immich and Twenty: practically every
file matches tsc's output, and NestJS's and Immich's own test suites pass with ternTS.

No type checking (keep `tsc --noEmit` for that). Please open an issue if anything differs from tsc.

## License

MIT or Apache-2.0
