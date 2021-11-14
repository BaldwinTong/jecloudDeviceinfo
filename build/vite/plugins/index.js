import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { useTheme } from './theme';
import { configStyleImportPlugin } from './style-import';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
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
  const envs = loadEnv(mode, process.cwd(), 'VUE_APP_');
  for (let key in envs) {
    let val = envs[key];
    if (isNumeric(val)) {
      envs[key] = Number(val);
    } else if (['true', 'false'].includes(val)) {
      envs[key] = val == 'true';
    }
  }
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
export function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

export function isNumeric(value) {
  return !Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value));
}
