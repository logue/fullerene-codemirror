/**
 * Fallback values for the Carbon color tokens used by the theme.
 * Each key is the camelCase form of a `--cds-*` CSS custom property name.
 * @see https://www.carbondesignsystem.com/building-blocks/foundations/color/tokens
 */
export type Palette = {
  /** `--cds-background` */
  background: string;
  /** `--cds-layer-accent-01` */
  layerAccent01: string;
  /** `--cds-layer-01` */
  layer01: string;
  /** `--cds-layer-02` */
  layer02: string;
  /** `--cds-layer-selected-01` */
  layerSelected01: string;
  /** `--cds-background-selected` */
  backgroundSelected: string;
  /** `--cds-highlight` */
  highlight: string;
  /** `--cds-text-primary` */
  textPrimary: string;
  /** `--cds-text-secondary` */
  textSecondary: string;
  /** `--cds-text-helper` */
  textHelper: string;
  /** `--cds-border-subtle-01` */
  borderSubtle01: string;
  /** `--cds-focus` */
  focus: string;
  /** `--cds-syntax-angle-bracket` */
  syntaxAngleBracket: string;
  /** `--cds-syntax-annotation` */
  syntaxAnnotation: string;
  /** `--cds-syntax-arithmetic-operator` */
  syntaxArithmeticOperator: string;
  /** `--cds-syntax-atom` */
  syntaxAtom: string;
  /** `--cds-syntax-attribute` */
  syntaxAttribute: string;
  /** `--cds-syntax-attribute-name` */
  syntaxAttributeName: string;
  /** `--cds-syntax-attribute-value` */
  syntaxAttributeValue: string;
  /** `--cds-syntax-bitwise-operator` */
  syntaxBitwiseOperator: string;
  /** `--cds-syntax-block-comment` */
  syntaxBlockComment: string;
  /** `--cds-syntax-bool` */
  syntaxBool: string;
  /** `--cds-syntax-brace` */
  syntaxBrace: string;
  /** `--cds-syntax-bracket` */
  syntaxBracket: string;
  /** `--cds-syntax-character` */
  syntaxCharacter: string;
  /** `--cds-syntax-class-name` */
  syntaxClassName: string;
  /** `--cds-syntax-color` */
  syntaxColor: string;
  /** `--cds-syntax-comment` */
  syntaxComment: string;
  /** `--cds-syntax-compare-operator` */
  syntaxCompareOperator: string;
  /** `--cds-syntax-constant` */
  syntaxConstant: string;
  /** `--cds-syntax-content` */
  syntaxContent: string;
  /** `--cds-syntax-content-separator` */
  syntaxContentSeparator: string;
  /** `--cds-syntax-control-keyword` */
  syntaxControlKeyword: string;
  /** `--cds-syntax-control-operator` */
  syntaxControlOperator: string;
  /** `--cds-syntax-definition` */
  syntaxDefinition: string;
  /** `--cds-syntax-definition-keyword` */
  syntaxDefinitionKeyword: string;
  /** `--cds-syntax-definition-operator` */
  syntaxDefinitionOperator: string;
  /** `--cds-syntax-deleted` */
  syntaxDeleted: string;
  /** `--cds-syntax-deref-operator` */
  syntaxDerefOperator: string;
  /** `--cds-syntax-doc-comment` */
  syntaxDocComment: string;
  /** `--cds-syntax-doc-string` */
  syntaxDocString: string;
  /** `--cds-syntax-document-meta` */
  syntaxDocumentMeta: string;
  /** `--cds-syntax-emphasis` */
  syntaxEmphasis: string;
  /** `--cds-syntax-escape` */
  syntaxEscape: string;
  /** `--cds-syntax-float` */
  syntaxFloat: string;
  /** `--cds-syntax-function` */
  syntaxFunction: string;
  /** `--cds-syntax-heading` */
  syntaxHeading: string;
  /** `--cds-syntax-heading-1` */
  syntaxHeading1: string;
  /** `--cds-syntax-heading-2` */
  syntaxHeading2: string;
  /** `--cds-syntax-heading-3` */
  syntaxHeading3: string;
  /** `--cds-syntax-heading-4` */
  syntaxHeading4: string;
  /** `--cds-syntax-heading-5` */
  syntaxHeading5: string;
  /** `--cds-syntax-heading-6` */
  syntaxHeading6: string;
  /** `--cds-syntax-inserted` */
  syntaxInserted: string;
  /** `--cds-syntax-integer` */
  syntaxInteger: string;
  /** `--cds-syntax-invalid` */
  syntaxInvalid: string;
  /** `--cds-syntax-keyword` */
  syntaxKeyword: string;
  /** `--cds-syntax-label-name` */
  syntaxLabelName: string;
  /** `--cds-syntax-line-comment` */
  syntaxLineComment: string;
  /** `--cds-syntax-link` */
  syntaxLink: string;
  /** `--cds-syntax-list` */
  syntaxList: string;
  /** `--cds-syntax-literal` */
  syntaxLiteral: string;
  /** `--cds-syntax-local` */
  syntaxLocal: string;
  /** `--cds-syntax-logic-operator` */
  syntaxLogicOperator: string;
  /** `--cds-syntax-macro-name` */
  syntaxMacroName: string;
  /** `--cds-syntax-meta` */
  syntaxMeta: string;
  /** `--cds-syntax-modifier` */
  syntaxModifier: string;
  /** `--cds-syntax-module-keyword` */
  syntaxModuleKeyword: string;
  /** `--cds-syntax-monospace` */
  syntaxMonospace: string;
  /** `--cds-syntax-name` */
  syntaxName: string;
  /** `--cds-syntax-namespace` */
  syntaxNamespace: string;
  /** `--cds-syntax-null` */
  syntaxNull: string;
  /** `--cds-syntax-number` */
  syntaxNumber: string;
  /** `--cds-syntax-operator` */
  syntaxOperator: string;
  /** `--cds-syntax-operator-keyword` */
  syntaxOperatorKeyword: string;
  /** `--cds-syntax-paren` */
  syntaxParen: string;
  /** `--cds-syntax-processing-instruction` */
  syntaxProcessingInstruction: string;
  /** `--cds-syntax-property-name` */
  syntaxPropertyName: string;
  /** `--cds-syntax-punctuation` */
  syntaxPunctuation: string;
  /** `--cds-syntax-quote` */
  syntaxQuote: string;
  /** `--cds-syntax-regexp` */
  syntaxRegexp: string;
  /** `--cds-syntax-self` */
  syntaxSelf: string;
  /** `--cds-syntax-separator` */
  syntaxSeparator: string;
  /** `--cds-syntax-special` */
  syntaxSpecial: string;
  /** `--cds-syntax-special-string` */
  syntaxSpecialString: string;
  /** `--cds-syntax-square-bracket` */
  syntaxSquareBracket: string;
  /** `--cds-syntax-standard` */
  syntaxStandard: string;
  /** `--cds-syntax-strikethrough` */
  syntaxStrikethrough: string;
  /** `--cds-syntax-string` */
  syntaxString: string;
  /** `--cds-syntax-strong` */
  syntaxStrong: string;
  /** `--cds-syntax-tag` */
  syntaxTag: string;
  /** `--cds-syntax-tag-name` */
  syntaxTagName: string;
  /** `--cds-syntax-type` */
  syntaxType: string;
  /** `--cds-syntax-type-name` */
  syntaxTypeName: string;
  /** `--cds-syntax-type-operator` */
  syntaxTypeOperator: string;
  /** `--cds-syntax-unit` */
  syntaxUnit: string;
  /** `--cds-syntax-update-operator` */
  syntaxUpdateOperator: string;
  /** `--cds-syntax-url` */
  syntaxUrl: string;
  /** `--cds-syntax-variable` */
  syntaxVariable: string;
  /** `--cds-syntax-variable-name` */
  syntaxVariableName: string;
};
