---
description: What @c60/codemirror-theme is and how it maps Carbon tokens to CodeMirror.
---

# Introduction

`@c60/codemirror-theme` is a [CodeMirror 6](https://codemirror.net/) theme based on the [Carbon Design System](https://carbondesignsystem.com/) (Fullerene).

Every color in the theme is written as a Carbon CSS custom property:

```css
color: var(--cds-text-primary, #161616);
```

- When the page loads a Carbon theme, the editor follows it automatically.
- When it does not, the bundled palette value after the comma is used.

## What is themed

| Area                     | Carbon tokens                                                           |
| ------------------------ | ----------------------------------------------------------------------- |
| Editor background / text | `--cds-background`, `--cds-text-primary`                                |
| Cursor                   | `--cds-focus`                                                           |
| Selection, search match  | `--cds-highlight`, `--cds-layer-selected-01`                            |
| Active line              | `--cds-background-selected`                                             |
| Gutters, panels          | `--cds-layer-01`, `--cds-border-subtle-01`, `--cds-text-helper`         |
| Tooltips, autocomplete   | `--cds-layer-02`, `--cds-layer-selected-01`                             |
| Syntax highlighting      | `--cds-syntax-*` (one token per `@lezer/highlight` tag)                 |
| Typography               | `--cds-code-02-*` (IBM Plex Mono by default; font loading is up to you) |
