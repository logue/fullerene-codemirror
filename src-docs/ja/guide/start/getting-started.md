---
description: '@c60/codemirror-theme をインストールして CodeMirror エディターに追加する。'
---

# クイックスタート

## インストール

```sh
pnpm add @c60/codemirror-theme
```

以下のピア依存関係が必要です（通常は CodeMirror と一緒にインストール済みです）。

- `@codemirror/language`
- `@codemirror/state`
- `@codemirror/view`
- `@lezer/highlight`

## 使い方

```ts
import { EditorView, basicSetup } from 'codemirror';
import { carbonLight } from '@c60/codemirror-theme';

new EditorView({
  doc: 'console.log("Hello, Carbon!");',
  extensions: [basicSetup, carbonLight],
  parent: document.body
});
```

ダークなエディターには `carbonDark` を使います。実行時に切り替えるには、テーマを
[`Compartment`](https://codemirror.net/docs/ref/#state.Compartment) に入れます。

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

## Vue（vue-codemirror6）

[vue-codemirror6](https://github.com/logue/vue-codemirror6) では、テーマを
`extensions` プロパティで渡します。このプロパティはリアクティブなので、配列を再計算するだけで
テーマを切り替えられます（`Compartment` は不要です）。

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
  <label><input v-model="dark" type="checkbox" /> ダーク</label>
  <CodeMirror v-model="value" :lang="javascript()" :extensions="extensions" basic />
</template>
```

ページですでに Carbon テーマを適用している場合は、変数モード
（[テーマモード](./modes)を参照）を使うと、エディターがページに追従します。

```ts
import { carbonVariables, createCarbonVariablesTheme } from '@c60/codemirror-theme';

const extensions = computed(() => [
  dark.value ? createCarbonVariablesTheme(true) : carbonVariables
]);
```

### Web Components 版

vue-codemirror6 には、Vue なしで使える `<code-mirror>` カスタム要素も含まれています。
`vue-codemirror6/wc-auto` をインポートして要素を登録し、JavaScript からプロパティを設定します。
拡張機能や言語はオブジェクトなので、属性ではなくプロパティとして設定してください。

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

エディターは要素のシャドウルート内に描画されます。CSS カスタムプロパティはシャドウ DOM にも継承されるため、
ページで定義した `--cds-*` 変数（たとえば Carbon Web Components によるもの）はエディターにも届き、
変数モード（`carbonVariables` / `createCarbonVariablesTheme()`）も同じように動作します。
通常のページの CSS はエディターに届かないため、スタイルを変更する場合は拡張機能
（たとえば `EditorView.theme({ ... })`）として渡してください。

## フォント

テーマは `--cds-code-02-font-family` を通じて IBM Plex Mono を使いますが、フォント自体は読み込みません。
`@ibm/plex` や Google Fonts [^1] などで各自読み込んでください。

### CJK フォント

IBM Plex Mono には CJK のグリフがありません。日本語・中国語・韓国語のテキストを表示するには、
フォントスタックの IBM Plex Mono **より後ろ**に CJK フォントを追加してください。
CJK フォントを先に置くと、英数字までそのフォントで描画されるため、
IBM Plex Mono の見た目と等幅の揃えが失われます。

エディターの祖先要素で `--cds-code-02-font-family` を上書きします。

```css
:root {
  --cds-code-02-font-family:
    'IBM Plex Mono', 'IBM Plex Sans JP', 'IBM Plex Sans SC', 'IBM Plex Sans KR', Menlo, monospace;
}
```

[^1]: <https://fonts.google.com/specimen/IBM+Plex+Mono>

次へ：[テーマモード](./modes)
