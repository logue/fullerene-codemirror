---
description: '@c60/codemirror-theme 简介，以及它如何将 Carbon 令牌映射到 CodeMirror。'
---

# 简介

`@c60/codemirror-theme` 是一个基于 [Carbon 设计系统](https://carbondesignsystem.com/)（Fullerene）的 [CodeMirror 6](https://codemirror.net/) 主题。

主题中的每个颜色都以 Carbon CSS 自定义属性的形式编写：

```css
color: var(--cds-text-primary, #161616);
```

- 如果页面加载了 Carbon 主题，编辑器会自动跟随。
- 如果没有，则使用逗号后面的内置调色板值。

## 主题覆盖范围

| 区域               | Carbon 令牌                                                     |
| ------------------ | --------------------------------------------------------------- |
| 编辑器背景／文本   | `--cds-background`、`--cds-text-primary`                        |
| 光标               | `--cds-focus`                                                   |
| 选区、搜索匹配     | `--cds-highlight`、`--cds-layer-selected-01`                    |
| 当前行             | `--cds-background-selected`                                     |
| 行号栏、面板       | `--cds-layer-01`、`--cds-border-subtle-01`、`--cds-text-helper` |
| 工具提示、自动补全 | `--cds-layer-02`、`--cds-layer-selected-01`                     |
| 语法高亮           | `--cds-syntax-*`（每个 `@lezer/highlight` 标签对应一个令牌）    |
| 排版               | `--cds-code-02-*`（默认使用 IBM Plex Mono；字体需自行加载）     |
