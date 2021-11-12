import { getPlugins } from './preprocessor';
import { generateModifyVars } from '../../../theme/debug';

/**
 * 获取主题插件
 *
 * @export
 * @param {*} envs 系统变量
 * @return {*}
 */
export function useTheme(envs) {
  // 主题调试，主题个数
  const { VUE_APP_THEME_DEBUG = false, VUE_APP_THEME_COUNT = 1 } = envs;
  let vars = {};
  let themePlugins = [];
  if (VUE_APP_THEME_DEBUG) {
    vars = generateModifyVars();
  } else {
    themePlugins = getPlugins(VUE_APP_THEME_COUNT);
  }

  return {
    themePlugins,
    lessModifyVars: vars,
  };
}
