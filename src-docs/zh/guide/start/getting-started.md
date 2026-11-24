---
description: 安装 @c60/codemirror-theme 并将其添加到 CodeMirror 编辑器。
---

# 快速开始

## 安装

```sh
pnpm add @c60/codemirror-theme
```

需要以下对等依赖（通常已随 CodeMirror 一起安装）：

- `@codemirror/language`
- `@codemirror/state`
- `@codemirror/view`
- `@lezer/highlight`

## 用法

```ts
import { EditorView, basicSetup } from 'codemirror';
import { carbonLight } from '@c60/codemirror-theme';

new EditorView({
  doc: 'console.log("Hello, Carbon!");',
  extensions: [basicSetup, carbonLight],
  parent: document.body
});
```

深色编辑器请使用 `carbonDark`。如需在运行时切换，请将主题放入
[`Compartment`](https://codemirror.net/docs/ref/#state.Compartment)：

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

使用 [vue-codemirror6](https://github.com/logue/vue-codemirror6) 时，通过 `extensions`
属性传入主题。该属性是响应式的，只需重新计算数组即可切换主题（无需 `Compartment`）：

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
  <label><input v-model="dark" type="checkbox" /> 深色</label>
  <CodeMirror v-model="value" :lang="javascript()" :extensions="extensions" basic />
</template>
```

如果页面已经应用了 Carbon 主题，请使用变量模式（参见[主题模式](./modes)），让编辑器跟随页面：

```ts
import { carbonVariables, createCarbonVariablesTheme } from '@c60/codemirror-theme';

const extensions = computed(() => [
  dark.value ? createCarbonVariablesTheme(true) : carbonVariables
]);
```

### Web Components 版本

vue-codemirror6 还提供了无需 Vue 即可使用的 `<code-mirror>` 自定义元素。
导入 `vue-codemirror6/wc-auto` 注册该元素，然后通过 JavaScript 设置其属性。
扩展和语言都是对象，因此请以 property 而不是 attribute 的方式设置：

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

编辑器渲染在元素的 shadow root 中。CSS 自定义属性会继承到 shadow DOM，因此页面上定义的
`--cds-*` 变量（例如由 Carbon Web Components 定义的）也会作用于编辑器，变量模式
（`carbonVariables` / `createCarbonVariablesTheme()`）同样有效。
普通的页面 CSS 无法作用于编辑器，因此如需修改样式，请以扩展的形式传入（例如 `EditorView.theme({ ... })`）。

## 字体

主题通过 `--cds-code-02-font-family` 使用 IBM Plex Mono，但不会加载该字体。
请自行加载，例如使用 `@ibm/plex` 或 Google Fonts [^1]。

### CJK 字体

IBM Plex Mono 不包含 CJK 字形。要显示中文、日文或韩文文本，请将 CJK 字体添加到字体栈中
IBM Plex Mono **之后**。如果 CJK 字体排在前面，拉丁字母和数字也会用它渲染，
代码将失去 IBM Plex Mono 的外观和等宽对齐。

在编辑器的祖先元素上覆盖 `--cds-code-02-font-family`：

```css
:root {
  --cds-code-02-font-family:
    'IBM Plex Mono', 'IBM Plex Sans SC', 'IBM Plex Sans JP', 'IBM Plex Sans KR', Menlo, monospace;
}
```

[^1]: <https://fonts.google.com/specimen/IBM+Plex+Mono>

下一步：[主题模式](./modes)
