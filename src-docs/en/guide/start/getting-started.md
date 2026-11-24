---
description: Install @c60/codemirror-theme and add it to a CodeMirror editor.
---

# Getting Started

## Installation

```sh
pnpm add @c60/codemirror-theme
```

The following peer dependencies are required (they are usually installed already with CodeMirror):

- `@codemirror/language`
- `@codemirror/state`
- `@codemirror/view`
- `@lezer/highlight`

## Usage

```ts
import { EditorView, basicSetup } from 'codemirror';
import { carbonLight } from '@c60/codemirror-theme';

new EditorView({
  doc: 'console.log("Hello, Carbon!");',
  extensions: [basicSetup, carbonLight],
  parent: document.body
});
```

Use `carbonDark` for a dark editor. To switch at runtime, put the theme in a
[`Compartment`](https://codemirror.net/docs/ref/#state.Compartment):

```ts
import { Compartment } from '@codemirror/state';
import { carbonDark, carbonLight } from '@c60/codemirror-theme';

const theme = new Compartment();
const view = new EditorView({
  extensions: [basicSetup, theme.of(carbonLight)],
  parent: document.body
});

const setDark = (dark: boolean) =>
  view.dispatch({ effects: theme.reconfigure(dark ? carbonDark : carbonLight) });
```

## Fonts

The theme uses IBM Plex Mono via `--cds-code-02-font-family` but does not load it.
Load it yourself, for example with `@ibm/plex` or Google Fonts.

Next: [Theme modes](./modes).
