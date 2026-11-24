import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';

import type { Palette } from '@/types/Palette';
import type { Extension } from '@codemirror/state';

import { darkPalette } from '@/dark-mode';
import { lightPalette } from '@/light-mode';

export { Meta } from '@/types/Meta';
export { darkPalette, lightPalette };
export type { Palette };

/** Converts a camelCase palette key to its `--cds-*` CSS custom property name. */
const toVariable = (key: string): string =>
  `--cds-${key.replace(/(?<=[a-z])(?=[A-Z0-9])/g, '-').toLowerCase()}`;

/**
 * Returns a color accessor that resolves Carbon tokens.
 * With a palette, the palette values are used as fallbacks; with `null`,
 * the `--cds-*` custom properties are referenced as-is (no fallback).
 */
const resolver =
  (palette?: Palette) =>
  (key: keyof Palette): string =>
    palette ? `var(${toVariable(key)}, ${palette[key]})` : `var(${toVariable(key)})`;

/** Carbon code typography tokens (font loading is left to the consumer). */
const typography = {
  fontFamily: "var(--cds-code-02-font-family, 'IBM Plex Mono', 'Menlo', 'Courier New', monospace)",
  fontSize: 'var(--cds-code-02-font-size, 0.875rem)',
  fontWeight: 'var(--cds-code-02-font-weight, 400)',
  lineHeight: 'var(--cds-code-02-line-height, 1.42857)',
  letterSpacing: 'var(--cds-code-02-letter-spacing, 0.32px)'
};

/** Creates the editor theme for the given palette. */
export const createTheme = (palette?: Palette, dark = false): Extension => {
  const c = resolver(palette);
  return EditorView.theme(
    {
      '&': { color: c('textPrimary'), backgroundColor: c('background') },
      '.cm-scroller': typography,
      '.cm-content': { caretColor: c('focus') },
      '.cm-cursor, .cm-dropCursor': { borderLeftColor: c('focus') },
      '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
        { backgroundColor: c('highlight') },

      '.cm-panels': { backgroundColor: c('layer01'), color: c('textSecondary') },
      '.cm-panels.cm-panels-top': { borderBottom: `1px solid ${c('borderSubtle01')}` },
      '.cm-panels.cm-panels-bottom': { borderTop: `1px solid ${c('borderSubtle01')}` },

      '.cm-searchMatch': {
        backgroundColor: c('highlight'),
        outline: `1px solid ${c('textSecondary')}`,
        color: c('textPrimary')
      },
      '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: c('layerSelected01'),
        color: c('textPrimary')
      },

      '.cm-activeLine': { backgroundColor: c('backgroundSelected') },
      '.cm-selectionMatch': { backgroundColor: c('backgroundSelected') },

      '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        outline: `1px solid ${c('textSecondary')}`
      },
      '&.cm-focused .cm-matchingBracket': {
        backgroundColor: c('highlight'),
        color: c('textPrimary')
      },

      '.cm-gutters': {
        borderRight: `1px solid ${c('borderSubtle01')}`,
        color: c('textHelper'),
        backgroundColor: c('layer01')
      },
      '.cm-activeLineGutter': { backgroundColor: c('backgroundSelected') },

      '.cm-foldPlaceholder': {
        backgroundColor: 'transparent',
        border: 'none',
        color: c('textHelper')
      },

      '.cm-tooltip': {
        border: 'none',
        color: c('textPrimary'),
        backgroundColor: c('layer02')
      },
      '.cm-tooltip .cm-tooltip-arrow:before': {
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent'
      },
      '.cm-tooltip .cm-tooltip-arrow:after': {
        borderTopColor: c('layer02'),
        borderBottomColor: c('layer02')
      },
      '.cm-tooltip-autocomplete': {
        '& > ul > li[aria-selected]': {
          backgroundColor: c('layerSelected01'),
          color: c('textPrimary')
        }
      }
    },
    { dark }
  );
};

/** Creates the highlight style (Carbon `--cds-syntax-*` tokens) for the given palette. */
export const createHighlightStyle = (palette?: Palette): HighlightStyle => {
  const c = resolver(palette);
  return HighlightStyle.define([
    { tag: t.comment, color: c('syntaxComment'), fontStyle: 'italic' },
    { tag: t.lineComment, color: c('syntaxLineComment'), fontStyle: 'italic' },
    { tag: t.blockComment, color: c('syntaxBlockComment'), fontStyle: 'italic' },
    { tag: t.docComment, color: c('syntaxDocComment'), fontStyle: 'italic' },
    { tag: t.name, color: c('syntaxName') },
    { tag: t.variableName, color: c('syntaxVariableName') },
    { tag: t.typeName, color: c('syntaxTypeName') },
    { tag: t.tagName, color: c('syntaxTagName') },
    { tag: t.propertyName, color: c('syntaxPropertyName') },
    { tag: t.attributeName, color: c('syntaxAttributeName') },
    { tag: t.className, color: c('syntaxClassName') },
    { tag: t.labelName, color: c('syntaxLabelName') },
    { tag: t.namespace, color: c('syntaxNamespace') },
    { tag: t.macroName, color: c('syntaxMacroName') },
    { tag: t.literal, color: c('syntaxLiteral') },
    { tag: t.string, color: c('syntaxString') },
    { tag: t.docString, color: c('syntaxDocString') },
    { tag: t.character, color: c('syntaxCharacter') },
    { tag: t.attributeValue, color: c('syntaxAttributeValue') },
    { tag: t.number, color: c('syntaxNumber') },
    { tag: t.integer, color: c('syntaxInteger') },
    { tag: t.float, color: c('syntaxFloat') },
    { tag: t.bool, color: c('syntaxBool') },
    { tag: t.regexp, color: c('syntaxRegexp') },
    { tag: t.escape, color: c('syntaxEscape') },
    { tag: t.color, color: c('syntaxColor') },
    { tag: t.url, color: c('syntaxUrl') },
    { tag: t.keyword, color: c('syntaxKeyword') },
    { tag: t.self, color: c('syntaxSelf') },
    { tag: t.null, color: c('syntaxNull') },
    { tag: t.atom, color: c('syntaxAtom') },
    { tag: t.unit, color: c('syntaxUnit') },
    { tag: t.modifier, color: c('syntaxModifier') },
    { tag: t.operatorKeyword, color: c('syntaxOperatorKeyword') },
    { tag: t.controlKeyword, color: c('syntaxControlKeyword') },
    { tag: t.definitionKeyword, color: c('syntaxDefinitionKeyword') },
    { tag: t.moduleKeyword, color: c('syntaxModuleKeyword') },
    { tag: t.operator, color: c('syntaxOperator') },
    { tag: t.derefOperator, color: c('syntaxDerefOperator') },
    { tag: t.arithmeticOperator, color: c('syntaxArithmeticOperator') },
    { tag: t.logicOperator, color: c('syntaxLogicOperator') },
    { tag: t.bitwiseOperator, color: c('syntaxBitwiseOperator') },
    { tag: t.compareOperator, color: c('syntaxCompareOperator') },
    { tag: t.updateOperator, color: c('syntaxUpdateOperator') },
    { tag: t.definitionOperator, color: c('syntaxDefinitionOperator') },
    { tag: t.typeOperator, color: c('syntaxTypeOperator') },
    { tag: t.controlOperator, color: c('syntaxControlOperator') },
    { tag: t.punctuation, color: c('syntaxPunctuation') },
    { tag: t.separator, color: c('syntaxSeparator') },
    { tag: t.bracket, color: c('syntaxBracket') },
    { tag: t.angleBracket, color: c('syntaxAngleBracket') },
    { tag: t.squareBracket, color: c('syntaxSquareBracket') },
    { tag: t.paren, color: c('syntaxParen') },
    { tag: t.brace, color: c('syntaxBrace') },
    { tag: t.content, color: c('syntaxContent') },
    { tag: t.heading, color: c('syntaxHeading'), fontWeight: 'bold' },
    { tag: t.heading1, color: c('syntaxHeading1'), fontWeight: 'bold' },
    { tag: t.heading2, color: c('syntaxHeading2'), fontWeight: 'bold' },
    { tag: t.heading3, color: c('syntaxHeading3'), fontWeight: 'bold' },
    { tag: t.heading4, color: c('syntaxHeading4'), fontWeight: 'bold' },
    { tag: t.heading5, color: c('syntaxHeading5'), fontWeight: 'bold' },
    { tag: t.heading6, color: c('syntaxHeading6'), fontWeight: 'bold' },
    { tag: t.contentSeparator, color: c('syntaxContentSeparator') },
    { tag: t.list, color: c('syntaxList') },
    { tag: t.quote, color: c('syntaxQuote') },
    { tag: t.emphasis, color: c('syntaxEmphasis'), fontStyle: 'italic' },
    { tag: t.strong, color: c('syntaxStrong'), fontWeight: 'bold' },
    { tag: t.monospace, color: c('syntaxMonospace') },
    { tag: t.inserted, color: c('syntaxInserted') },
    { tag: t.deleted, color: c('syntaxDeleted') },
    { tag: t.invalid, color: c('syntaxInvalid'), textDecoration: 'underline wavy' },
    { tag: t.meta, color: c('syntaxMeta') },
    { tag: t.documentMeta, color: c('syntaxDocumentMeta') },
    { tag: t.annotation, color: c('syntaxAnnotation') },
    { tag: t.processingInstruction, color: c('syntaxProcessingInstruction') },
    { tag: t.function(t.variableName), color: c('syntaxFunction') },
    { tag: t.function(t.propertyName), color: c('syntaxFunction') },
    { tag: t.constant(t.name), color: c('syntaxConstant') },
    { tag: t.definition(t.name), color: c('syntaxDefinition') },
    { tag: t.standard(t.name), color: c('syntaxStandard') },
    { tag: t.local(t.variableName), color: c('syntaxLocal') },
    { tag: t.special(t.variableName), color: c('syntaxSpecial') },
    { tag: t.special(t.string), color: c('syntaxSpecialString') }
  ]);
};

/** Creates a complete theme extension (editor theme + highlight style). */
export const createCarbonTheme = (palette?: Palette, dark = false): Extension => [
  createTheme(palette, dark),
  syntaxHighlighting(createHighlightStyle(palette))
];

/** Carbon light theme (White fallbacks). */
export const carbonLight: Extension = createCarbonTheme(lightPalette, false);

/** Carbon dark theme (Gray 100 fallbacks). */
export const carbonDark: Extension = createCarbonTheme(darkPalette, true);

/**
 * Creates a theme that uses the `--cds-*` CSS custom properties as-is, without
 * fallback values. The host page (e.g. Carbon's `cds--g10` / `cds--g100` theme
 * classes) must define the variables.
 * @param dark - Whether the surrounding Carbon theme is dark (affects CodeMirror's base theme).
 */
export const createCarbonVariablesTheme = (dark = false): Extension =>
  createCarbonTheme(undefined, dark);

/** Carbon theme referencing `--cds-*` variables directly (no fallbacks, light base). */
export const carbonVariables: Extension = createCarbonVariablesTheme(false);
