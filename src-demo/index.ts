import '@carbon/web-components/es/components/grid/index.js';
import '@carbon/web-components/es/components/select/index.js';
import '@carbon/web-components/es/components/toggle/index.js';
import '@carbon/web-components/es/components/ui-shell/index.js';
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

import { carbonDark, carbonLight, createCarbonVariablesTheme } from '@/index';

type Language = keyof typeof samples;

/** Sent to the parent so it can fit the iframe height (see `src-docs/components/DemoIframe.tsx`). */
interface ResizeIframeMessage {
  type: 'resize-iframe';
  height: string;
}

/** Received from the parent to switch dark mode. */
interface SetThemeMessage {
  type: 'set-theme';
  dark: boolean;
}

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
const languageSelect = query('#language-select') as HTMLElement & { value: string };
const modeSelect = query('#mode-select') as HTMLElement & { value: string };
const fileName = query('#file-name');
const themeBadge = query('#theme-badge');

/** True when the demo is embedded (e.g. in the documentation site's Playground page). */
const embedded = globalThis.self !== globalThis.top;

const extensions: Record<Language, string> = {
  javascript: 'js',
  typescript: 'ts',
  html: 'html',
  css: 'css',
  json: 'json',
  markdown: 'md',
  python: 'py'
};

/**
 * Removes CodeMirror's own focus outline; the host frame shows focus instead.
 * This must be an extension because the editor lives inside the element's shadow root.
 */
const noFocusOutline = EditorView.theme({ '&.cm-focused': { outline: 'none' } });

const state = { dark: false, variables: false };

/** Applies the Carbon theme (page) and the editor theme from the current state. */
const render = (): void => {
  const { dark, variables } = state;
  document.documentElement.dataset.carbonTheme = dark ? 'g100' : 'white';
  let theme: Extension = dark ? carbonDark : carbonLight;
  let label = dark ? 'carbonDark' : 'carbonLight';
  if (variables) {
    theme = createCarbonVariablesTheme(dark);
    label = `createCarbonVariablesTheme(${String(dark)})`;
  }
  editor.dark = dark;
  editor.extensions = [theme, noFocusOutline];
  themeBadge.textContent = label;
};

const setDark = (dark: boolean): void => {
  state.dark = dark;
  toggle.toggled = dark;
  render();
};

/** Switches the editor language and loads its sample code. */
const applyLanguage = (language: Language): void => {
  editor.lang = languages[language]();
  editor.modelValue = samples[language];
  fileName.textContent = `example.${extensions[language]}`;
};

const isThemeMessage = (data: unknown): data is SetThemeMessage =>
  typeof data === 'object' &&
  data !== null &&
  (data as Partial<SetThemeMessage>).type === 'set-theme' &&
  typeof (data as Partial<SetThemeMessage>).dark === 'boolean';

if (embedded) {
  // The parent page owns dark mode: follow its `set-theme` messages only.
  document.documentElement.dataset.embedded = '';
  globalThis.addEventListener('message', (event: MessageEvent<unknown>) => {
    if (event.origin !== globalThis.location.origin || !isThemeMessage(event.data)) {
      return;
    }
    setDark(event.data.dark);
  });

  // Report the content height so the parent can size the iframe.
  const postHeight = (): void => {
    const message: ResizeIframeMessage = {
      type: 'resize-iframe',
      height: String(document.documentElement.scrollHeight)
    };
    globalThis.parent.postMessage(message, globalThis.location.origin);
  };
  new ResizeObserver(postHeight).observe(document.body);
} else {
  const media = globalThis.matchMedia('(prefers-color-scheme: dark)');
  setDark(media.matches);
  media.addEventListener('change', event => {
    setDark(event.matches);
  });
  toggle.addEventListener('cds-toggle-changed', () => {
    setDark(toggle.toggled);
  });
}

render();
applyLanguage('javascript');

languageSelect.addEventListener('cds-select-selected', () => {
  if (languageSelect.value in languages) {
    applyLanguage(languageSelect.value as Language);
  }
});
modeSelect.addEventListener('cds-select-selected', () => {
  state.variables = modeSelect.value === 'variables';
  render();
});
