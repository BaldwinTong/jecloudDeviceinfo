import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor';
const themeConfig = require('../../theme/config');
const { lessVars, debugVars } = themeConfig;

/**
 * 获取主题插件
 *
 * @export
 * @param {*} envs 系统变量
 * @return {*}
 */
export function useTheme(envs) {
  // 主题调试，主题个数
  const { VUE_APP_THEME_COUNT } = envs;
  let vars = {};
  let themePlugins = [];
  const themeDebug = VUE_APP_THEME_COUNT === -1;
  if (themeDebug) {
    vars = debugVars;
  } else {
    themePlugins = getPlugins(VUE_APP_THEME_COUNT);
  }

  return {
    themePlugins,
    lessModifyVars: vars,
  };
}

// 主题个数
const themeCount = lessVars.length / 2;

// 获得主题插件
export function getPlugins(count = themeCount) {
  if (count < 1 || count > themeCount) {
    count = themeCount;
  }
  const vars = lessVars.slice(0, count * 2);
  return [
    themePreprocessorPlugin({
      less: {
        multipleScopeVars: vars,
      },
    }),
  ];
}