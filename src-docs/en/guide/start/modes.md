---
description: Choose between fallback palettes and the raw --cds-* variables mode.
---

# Theme Modes

The theme can resolve colors in two ways.

## Palette mode (default)

`carbonLight` and `carbonDark` reference `--cds-*` variables **with fallbacks**:

```css
background-color: var(--cds-background, #ffffff);
```

- Works on any page, with or without Carbon.
- If Carbon variables are defined, they take precedence.
- `carbonLight` falls back to the Carbon **White** theme, `carbonDark` to **Gray 100**.

## Variables mode

`carbonVariables` and `createCarbonVariablesTheme()` reference the variables **as-is**, without fallbacks:

```css
background-color: var(--cds-background);
```

Use this when the page already applies a Carbon theme (for example via the
`cds--white`, `cds--g10`, `cds--g90` or `cds--g100` classes from `@carbon/styles`,
or Carbon Web Components) and you want the editor to follow it exactly.

```ts
import { carbonVariables, createCarbonVariablesTheme } from '@c60/codemirror-theme';

// Light Carbon theme on the page
extensions: [basicSetup, carbonVariables];

// Dark Carbon theme (g90 / g100) on the page
extensions: [basicSetup, createCarbonVariablesTheme(true)];
```

The `dark` argument only tells CodeMirror's base theme that the background is
dark (it affects defaults such as selection and some built-in UI). The colors
themselves always come from the page.

:::warning
In variables mode the `--cds-*` custom properties **must** be defined on an
ancestor of the editor. Undefined variables leave colors unset.

Syntax colors use the `--cds-syntax-*` tokens, which are not part of every
Carbon distribution. Make sure your Carbon setup defines them.
:::

Typography (`--cds-code-02-*`) keeps its fallbacks in both modes.

## Custom palette

To use your own fallback values, pass a `Palette` to `createCarbonTheme`:

```ts
import { createCarbonTheme, lightPalette } from '@c60/codemirror-theme';

const myTheme = createCarbonTheme({ ...lightPalette, background: '#f4f4f4' }, false);
```
