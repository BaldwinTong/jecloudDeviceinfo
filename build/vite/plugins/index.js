import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import builder from '@jecloud/builder';
import { configStyleImportPlugin } from './style-import';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { useTheme } from './theme';
/**
 * vite 插件
 *
 * @export
 * @param {*} envs 变量
 * @return {*}
 */
export function usePlugins(envs, command) {
  const plugins = [
    vue(),
    vueJsx(),
    configStyleImportPlugin(envs, command),
    configHtmlPlugin(envs, command),
    configMockPlugin(envs, command),
  ];
  return builder.useVite({
    plugins,
    ...useTheme(envs),
  });
}
