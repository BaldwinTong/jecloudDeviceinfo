import { getThemeColors, generateColors } from './themeConfig';

import {
  replaceStyleVariables,
  darkCssIsReady,
  loadDarkThemeCss,
} from 'vite-plugin-theme/es/client';
import { mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme/es/colorUtils';
import { addClass, hasClass, removeClass } from '@jecloud/utils';

export async function toggleTheme(theme, dark) {
  const color = theme.color;
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color,
  });
  updateDarkTheme(dark ? 'dark' : 'light');

  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors],
  });
}

export async function updateDarkTheme(mode = 'light') {
  const htmlRoot = document.getElementById('htmlRoot');
  if (!htmlRoot) {
    return;
  }
  const hasDarkClass = hasClass(htmlRoot, 'dark');
  if (mode === 'dark') {
    if (import.meta.env.PROD && !darkCssIsReady) {
      await loadDarkThemeCss();
    }
    htmlRoot.setAttribute('data-theme', 'dark');
    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark');
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark');
    }
  }
}
