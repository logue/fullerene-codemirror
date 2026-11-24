# @c60/codemirror-theme

Fullerene (Carbon Design System based) theme for [CodeMirror 6](https://codemirror.net/).

[![TypeScript](https://img.shields.io/badge/TypeScript-7-%230074c1.svg)](http://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-12-pink.svg)](https://pnpm.io/)
[![Rstack](https://img.shields.io/badge/rstack-0.9.4-orange.svg)](https://rstack.rs/)
[![X Follow](https://img.shields.io/twitter/follow/logue256?style=plastic)](https://x.com/logue256)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/logue?label=Sponsor&logo=github&color=ea4aaa)](https://github.com/sponsors/logue)

## Install

```sh
pnpm add @c60/codemirror-theme
```

## Usage

```ts
import { EditorView, basicSetup } from 'codemirror';
import { carbonLight } from '@c60/codemirror-theme';

new EditorView({ extensions: [basicSetup, carbonLight], parent: document.body });
```

| Export                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| `carbonLight` / `carbonDark`       | `--cds-*` variables with White / Gray 100 fallbacks     |
| `carbonVariables`                  | `--cds-*` variables as-is (requires Carbon on the page) |
| `createCarbonVariablesTheme(dark)` | Variables mode with a dark base theme                   |

## Documentation

See **<https://logue.dev/fullerene-codemirror/>** for the guide, API reference and playground.

## License

©2026 by Logue.
Licensed under the [MIT License](LICENSE).
