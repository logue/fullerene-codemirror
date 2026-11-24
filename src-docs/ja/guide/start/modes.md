---
description: フォールバック付きパレットと、--cds-* 変数をそのまま使う変数モードの選び方。
---

# テーマモード

テーマの色の解決方法は 2 通りあります。

## パレットモード（既定） {#palette-mode}

`carbonLight` と `carbonDark` は `--cds-*` 変数を**フォールバック付き**で参照します。

```css
background-color: var(--cds-background, #ffffff);
```

- Carbon の有無にかかわらず、どのページでも動作します。
- Carbon の変数が定義されていれば、そちらが優先されます。
- `carbonLight` は Carbon の **White** テーマ、`carbonDark` は **Gray 100** にフォールバックします。

## 変数モード {#variables-mode}

`carbonVariables` と `createCarbonVariablesTheme()` は、変数をフォールバックなしで**そのまま**参照します。

```css
background-color: var(--cds-background);
```

ページですでに Carbon テーマを適用しており（たとえば `@carbon/styles` の
`cds--white`、`cds--g10`、`cds--g90`、`cds--g100` クラスや Carbon Web Components）、
エディターをそれに正確に追従させたい場合に使います。

```ts
import { carbonVariables, createCarbonVariablesTheme } from '@c60/codemirror-theme';

// ページがライトの Carbon テーマの場合
extensions: [basicSetup, carbonVariables];

// ページがダークの Carbon テーマ（g90 / g100）の場合
extensions: [basicSetup, createCarbonVariablesTheme(true)];
```

引数 `dark` は、背景が暗いことを CodeMirror のベーステーマに伝えるだけです
（選択範囲や一部の組み込み UI などの既定値に影響します）。色そのものは常にページから取得されます。

:::warning
変数モードでは、`--cds-*` カスタムプロパティがエディターの祖先要素で**必ず**定義されている必要があります。
未定義の変数があると、その色は設定されません。

シンタックスの色には `--cds-syntax-*` トークンを使いますが、これはすべての Carbon
ディストリビューションに含まれているわけではありません。お使いの Carbon の設定で定義されていることを確認してください。
:::

タイポグラフィ（`--cds-code-02-*`）は、どちらのモードでもフォールバック付きです。

## カスタムパレット {#custom-palette}

独自のフォールバック値を使うには、`createCarbonTheme` に `Palette` を渡します。

```ts
import { createCarbonTheme, lightPalette } from '@c60/codemirror-theme';

const myTheme = createCarbonTheme({ ...lightPalette, background: '#f4f4f4' }, false);
```
