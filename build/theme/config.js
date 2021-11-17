// 主题
const lodash = require('lodash');
const antTheme = require('ant-design-vue/dist/theme');
const themeUtil = require('./utils');
const utils = require('../utils');
const { resolve } = utils;
const { getThemeVariables } = antTheme;

const themes = themeUtil.getThemes();

// 样式权重处理
const includeStyles = {
  less: {
    '.ant-menu-horizontal': {
      'box-shadow': 'none',
    },
  },
};
const themeDir = 'micro/assets/themes';
// 主题变量
const multipleScopeVars = function () {
  const vars = [];
  const fileSuffix = 'less';
  const filePreffix = 'theme';
  const modes = ['default', 'dark'];
  themes.forEach((theme) => {
    modes.forEach((mode) => {
      const styles = lodash.cloneDeep(includeStyles[fileSuffix]);
      vars.push({
        scopeName: `${filePreffix}-${theme.code}-${mode}`,
        path: resolve(`${themeDir}/${theme.code}-${mode}.${fileSuffix}`),
        includeStyles: styles,
      });
    });
  });
  return vars;
};

// less 变量
const lessVars = multipleScopeVars();

/**
 * 获取ant less变量
 * debug 变量
 * @export
 * @param {*} dark
 * @return {*}
 */
function generateModifyVars(dark) {
  const modifyVars = getThemeVariables({ dark });
  const primaryColor = '#3265f5'; // 主题色
  return {
    ...modifyVars,
    'primary-color': primaryColor,
    'vxe-primary-color': primaryColor,
  };
}

const debugVars = generateModifyVars(false);

module.exports = {
  lessVars,
  debugVars,
};
