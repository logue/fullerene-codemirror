import { describe, expect, it } from 'rstack/test';

import { EditorState } from '@codemirror/state';

import { carbonDark, carbonLight, darkPalette, lightPalette } from '@/index';

describe('palettes', () => {
  it('define the same token keys for light and dark mode', () => {
    expect(Object.keys(lightPalette).toSorted()).toEqual(Object.keys(darkPalette).toSorted());
  });

  it('use Carbon White / Gray 100 backgrounds as fallbacks', () => {
    expect(lightPalette.background).toBe('#ffffff');
    expect(darkPalette.background).toBe('#161616');
  });
});

describe('themes', () => {
  it.each([
    ['light', carbonLight],
    ['dark', carbonDark]
  ])('%s theme can be loaded into an editor state', (_, theme) => {
    expect(() => EditorState.create({ extensions: theme })).not.toThrow();
  });
});
