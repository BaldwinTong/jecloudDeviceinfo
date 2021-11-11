// 主题

import themes from '../../themes.json';
// 样式权重处理
const includeStyles = {
  less: {
    '.ant-btn-primary': {
      color: '#ffffff',
    },
    '.ant-btn-primary:hover, .ant-btn-primary:focus': {
      color: '#ffffff',
    },
    '.ant-menu-horizontal': {
      'box-shadow': 'none',
    },
    '.ant-btn-link': {
      'border-color': 'transparent',
    },
    '.ant-btn-link:hover, .ant-btn-link:focus, .ant-btn-link:active': {
      'border-color': 'transparent',
    },
  },
};
const themeDir = 'src/assets/themes';
// 主题变量
const multipleScopeVars = function () {
  const vars = [];
  const fileSuffix = 'less';
  const filePreffix = 'theme';
  const modes = ['default', 'dark'];
  themes.forEach((theme) => {
    modes.forEach((mode) => {
      vars.push({
        scopeName: `${filePreffix}-${theme.code}-${mode}`,
        path: `${themeDir}/${theme.code}-${mode}.${fileSuffix}`,
        includeStyles: includeStyles[fileSuffix],
      });
    });
  });
  return vars;
};

// 基础配置
export const baseOptions = {
  // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
  extract: false,
  // 独立主题css文件的输出路径，默认取 viteConfig.build.assetsDir 相对于 (viteConfig.build.outDir)
  outputDir: 'dist/themes',
  // 会选取defaultScopeName对应的主题css文件在html添加link
  themeLinkTagId: 'theme-link-tag',
  // "head"||"head-prepend" || "body" ||"body-prepend"
  themeLinkTagInjectTo: 'head',
  // 是否对抽取的css文件内对应scopeName的权重类名移除
  removeCssScopeName: false,
};

// less 变量
export const lessVars = multipleScopeVars();
