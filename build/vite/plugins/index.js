import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import styleImportPlugin from './style-import';
import { resolve } from 'path';
import themePlugins from './theme';
import htmlPlugin from './html';
/**
 * vite 插件
 *
 * @export
 * @param {*} envs 变量
 * @param {boolean} [debugTheme=false] 调试主题
 * @return {*}
 */
export function usePlugins(envs, debugTheme = false) {
  const plugins = [vue(), vueJsx(), styleImportPlugin, htmlPlugin(envs)];
  // 调试主题
  if (!debugTheme) {
    plugins.push(...themePlugins);
  }
  return plugins;
}

/**
 * 获得绝对路径
 *
 * @export
 * @param {*} dir
 * @return {*}
 */
export function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}
