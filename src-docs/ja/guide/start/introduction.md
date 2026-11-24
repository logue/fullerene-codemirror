---
description: '@c60/codemirror-theme の概要と、Carbon トークンを CodeMirror に対応付ける仕組み。'
---

# はじめに

`@c60/codemirror-theme` は、[Carbon デザインシステム](https://carbondesignsystem.com/)（Fullerene）をベースにした [CodeMirror 6](https://codemirror.net/) 用テーマです。

テーマのすべての色は Carbon の CSS カスタムプロパティとして記述されています。

```css
color: var(--cds-text-primary, #161616);
```

- ページで Carbon テーマを読み込んでいる場合、エディターは自動的にそれに追従します。
- 読み込んでいない場合は、カンマの後ろにある同梱パレットの値が使われます。

## テーマが適用される範囲

| 領域                             | Carbon トークン                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------- |
| エディターの背景／テキスト       | `--cds-background`、`--cds-text-primary`                                          |
| カーソル                         | `--cds-focus`                                                                     |
| 選択範囲、検索一致               | `--cds-highlight`、`--cds-layer-selected-01`                                      |
| アクティブ行                     | `--cds-background-selected`                                                       |
| ガター、パネル                   | `--cds-layer-01`、`--cds-border-subtle-01`、`--cds-text-helper`                   |
| ツールチップ、オートコンプリート | `--cds-layer-02`、`--cds-layer-selected-01`                                       |
| シンタックスハイライト           | `--cds-syntax-*`（`@lezer/highlight` のタグごとに 1 トークン）                    |
| タイポグラフィ                   | `--cds-code-02-*`（既定は IBM Plex Mono。フォントの読み込みは利用者側で行います） |
