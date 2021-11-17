import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { useTheme } from './theme';
import { configStyleImportPlugin } from './style-import';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
const utils = require('../../utils');
/**
 * vite 插件
 *
 * @export
 * @param {*} envs 变量
 * @return {*}
 */
export function usePlugins(envs, command) {
  const { themePlugins, lessModifyVars } = useTheme(envs, command);
  const plugins = [
    vue(),
    vueJsx(),
    configStyleImportPlugin(envs, command),
    configHtmlPlugin(envs, command),
    configMockPlugin(envs, command),
    ...themePlugins,
  ];
  return {
    plugins,
    lessModifyVars,
  };
}

/**
 * 加载系统参数
 *
 * @export
 * @param {*} mode
 * @return {*}
 */
export function loadEnvs(mode) {
  const envs = utils.resolveEnvs(loadEnv(mode, process.cwd(), 'VUE_APP_'));
  envs.NODE_ENV = mode;
  return envs;
}

/**
 * 获得绝对路径
 *
 * @export
 * @param {*} dir
 * @return {*}
 */
export function resolve(dir) {
  return utils.resolve(dir);
}

export function isNumeric(value) {
  return !Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value));
}
