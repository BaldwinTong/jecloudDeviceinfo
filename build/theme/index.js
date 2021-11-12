import { toggleTheme } from '../vite/plugins/theme/preprocessor/utils';
import themes from './themes.json';
import { CLI_ENVS } from 'micro/helper/constant';

export function getThemes() {
  let { VUE_APP_THEME_COUNT = themes.length } = CLI_ENVS;
  if (VUE_APP_THEME_COUNT < 1 || VUE_APP_THEME_COUNT > themes.length) {
    VUE_APP_THEME_COUNT = themes.length;
  }
  return themes.slice(0, VUE_APP_THEME_COUNT);
}
export { toggleTheme, themes };
