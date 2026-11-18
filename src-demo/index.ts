import '@carbon/web-components/es/components/grid/index.js';
import '@carbon/web-components/es/components/link/index.js';
import '@carbon/web-components/es/components/select/index.js';
import '@carbon/web-components/es/components/toggle/index.js';
import './index.scss';

import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';
import 'vue-codemirror6/wc-auto';

import { samples } from './samples';

import type { LanguageSupport } from '@codemirror/language';
import type { Extension } from '@codemirror/state';

import { carbonDark, carbonLight } from '@/index';

type Language = keyof typeof samples;

const languages: Record<Language, () => LanguageSupport> = {
  javascript: () => javascript(),
  typescript: () => javascript({ typescript: true }),
  html: () => html(),
  css: () => css(),
  json: () => json(),
  markdown: () => markdown(),
  python: () => python()
};

/** Writable props of the `<code-mirror>` custom element used by the demo. */
type CodeMirrorHost = Omit<HTMLElement, 'lang'> & {
  dark: boolean;
  extensions: Extension[];
  lang?: LanguageSupport;
  modelValue: string;
};

/** Returns the element matching the selector, or throws if it is missing. */
const query = (selector: string): HTMLElement => {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
};

const editor = query('#cm') as unknown as CodeMirrorHost;
const toggle = query('#theme-toggle') as HTMLElement & { toggled: boolean };
const select = query('#language-select') as HTMLElement & { value: string };

/**
 * Removes CodeMirror's own focus outline; the host frame shows focus instead.
 * This must be an extension because the editor lives inside the element's shadow root.
 */
const noFocusOutline = EditorView.theme({ '&.cm-focused': { outline: 'none' } });

/** Switches the Carbon zone class and the editor theme together. */
const applyTheme = (dark: boolean): void => {
  document.documentElement.classList.toggle('cds--g100', dark);
  document.documentElement.classList.toggle('cds--white', !dark);
  editor.dark = dark;
  editor.extensions = [dark ? carbonDark : carbonLight, noFocusOutline];
};

/** Switches the editor language and loads its sample code. */
const applyLanguage = (language: Language): void => {
  editor.lang = languages[language]();
  editor.modelValue = samples[language];
};

const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
toggle.toggled = prefersDark;
applyTheme(prefersDark);
applyLanguage('javascript');

toggle.addEventListener('cds-toggle-changed', () => {
  applyTheme(toggle.toggled);
});
select.addEventListener('cds-select-selected', () => {
  if (select.value in languages) {
    applyLanguage(select.value as Language);
  }
});
