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

## Vue (vue-codemirror6)

With [vue-codemirror6](https://github.com/logue/vue-codemirror6), pass the theme
through the `extensions` prop. Because the prop is reactive, switching the theme
is just a matter of recomputing the array (no `Compartment` needed):

```vue
<script setup lang="ts">
  import { computed, ref } from 'vue';
  import CodeMirror from 'vue-codemirror6';
  import { javascript } from '@codemirror/lang-javascript';
  import { carbonDark, carbonLight } from '@c60/codemirror-theme';

  const value = ref('console.log("Hello, Carbon!");');
  const dark = ref(false);

  const extensions = computed(() => [dark.value ? carbonDark : carbonLight]);
</script>

<template>
  <label><input v-model="dark" type="checkbox" /> Dark</label>
  <CodeMirror v-model="value" :lang="javascript()" :extensions="extensions" basic />
</template>
```

If the page already applies a Carbon theme, use the variables mode
(see [Theme modes](./modes)) so the editor follows the page:

```ts
import { carbonVariables, createCarbonVariablesTheme } from '@c60/codemirror-theme';

const extensions = computed(() => [
  dark.value ? createCarbonVariablesTheme(true) : carbonVariables
]);
```

### Web Components version

vue-codemirror6 also ships a `<code-mirror>` custom element, usable without Vue.
Import `vue-codemirror6/wc-auto` to register it, then set its properties from
JavaScript. Extensions and languages are objects, so set them as properties,
not attributes:

```html
<code-mirror id="cm" basic></code-mirror>
```

```ts
import 'vue-codemirror6/wc-auto';
import { javascript } from '@codemirror/lang-javascript';
import { carbonDark, carbonLight } from '@c60/codemirror-theme';

import type { Extension } from '@codemirror/state';

const editor = document.querySelector('#cm') as HTMLElement & {
  dark: boolean;
  extensions: Extension[];
  lang: unknown;
  modelValue: string;
};

editor.lang = javascript();
editor.modelValue = 'console.log("Hello, Carbon!");';

const setDark = (dark: boolean) => {
  editor.dark = dark;
  editor.extensions = [dark ? carbonDark : carbonLight];
};

setDark(false);
```

The editor is rendered inside the element's shadow root. CSS custom properties
inherit into shadow DOM, so `--cds-*` variables defined on the page (for example
with Carbon Web Components) also reach the editor, and the variables mode
(`carbonVariables` / `createCarbonVariablesTheme()`) works the same way.
Ordinary page CSS does not reach the editor, so pass any style changes as
extensions (for example `EditorView.theme({ ... })`).

## Fonts

The theme uses IBM Plex Mono via `--cds-code-02-font-family` but does not load it.
Load it yourself, for example with `@ibm/plex` or Google Fonts [^1].

### CJK fonts

IBM Plex Mono has no CJK glyphs. To show Japanese, Chinese or Korean text,
add a CJK font to the font stack **after** IBM Plex Mono. If a CJK font comes
first, it also renders Latin letters and digits, so the code loses IBM Plex
Mono's look and its fixed-width alignment.

Override `--cds-code-02-font-family` on an ancestor of the editor:

```css
:root {
  --cds-code-02-font-family:
    'IBM Plex Mono', 'IBM Plex Sans JP', 'IBM Plex Sans SC', 'IBM Plex Sans KR', Menlo, monospace;
}
```

[^1]: <https://fonts.google.com/specimen/IBM+Plex+Mono>

Next: [Theme modes](./modes).
