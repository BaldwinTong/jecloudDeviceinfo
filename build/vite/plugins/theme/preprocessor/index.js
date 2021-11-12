import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor';
import { baseOptions, lessVars } from './config';
import path from 'path';
function pathResolve(dir) {
  return path.resolve(process.cwd(), '.', dir);
}
// 转义路径
[...lessVars].forEach((item) => {
  item.path = pathResolve(item.path);
});
if (baseOptions.outputDir) {
  baseOptions.outputDir = pathResolve(baseOptions.outputDir);
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
        ...baseOptions,
      },
    }),
  ];
}

export function lessModifyVars() {}
