---
description: 在带后备值的调色板模式和直接使用 --cds-* 变量的变量模式之间进行选择。
---

# 主题模式

主题有两种解析颜色的方式。

## 调色板模式（默认） {#palette-mode}

`carbonLight` 和 `carbonDark` 以**带后备值**的方式引用 `--cds-*` 变量：

```css
background-color: var(--cds-background, #ffffff);
```

- 无论页面是否使用 Carbon，都能正常工作。
- 如果定义了 Carbon 变量，则优先使用这些变量。
- `carbonLight` 的后备值为 Carbon **White** 主题，`carbonDark` 为 **Gray 100**。

## 变量模式 {#variables-mode}

`carbonVariables` 和 `createCarbonVariablesTheme()` **直接**引用变量，不带后备值：

```css
background-color: var(--cds-background);
```

当页面已经应用了 Carbon 主题（例如通过 `@carbon/styles` 的 `cds--white`、`cds--g10`、
`cds--g90` 或 `cds--g100` 类，或 Carbon Web Components），并且希望编辑器完全跟随它时，请使用此模式。

```ts
import { carbonVariables, createCarbonVariablesTheme } from '@c60/codemirror-theme';

// 页面使用浅色 Carbon 主题
extensions: [basicSetup, carbonVariables];

// 页面使用深色 Carbon 主题（g90 / g100）
extensions: [basicSetup, createCarbonVariablesTheme(true)];
```

`dark` 参数只是告诉 CodeMirror 的基础主题背景是深色的（会影响选区和部分内置 UI 等默认值）。
颜色本身始终来自页面。

:::warning
在变量模式下，`--cds-*` 自定义属性**必须**在编辑器的祖先元素上定义。未定义的变量会导致颜色未设置。

语法颜色使用 `--cds-syntax-*` 令牌，但并非所有 Carbon 发行版都包含它们。请确认你的 Carbon 配置定义了这些令牌。
:::

排版（`--cds-code-02-*`）在两种模式下都保留后备值。

## 自定义调色板 {#custom-palette}

要使用自己的后备值，请将 `Palette` 传给 `createCarbonTheme`：

```ts
import { createCarbonTheme, lightPalette } from '@c60/codemirror-theme';

const myTheme = createCarbonTheme({ ...lightPalette, background: '#f4f4f4' }, false);
```
