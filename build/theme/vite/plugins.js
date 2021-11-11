import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor';
import { baseOptions, lessVars } from '../config';
import path from 'path';
function pathResolve(dir) {
  return path.resolve(process.cwd(), '.', dir);
}
// 转义路径
[...lessVars].forEach((item) => {
  item.path = pathResolve(item.path);
});
baseOptions.outputDir = pathResolve(baseOptions.outputDir);
export default [
  themePreprocessorPlugin({
    less: {
      multipleScopeVars: lessVars,
      ...baseOptions,
    },
  }),
];
