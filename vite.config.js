import { defineConfig } from 'vite';
import { usePlugins } from './build/vite/plugins';
import { configProxy } from './build/vite/proxy';
const utils = require('./build/utils');

export default defineConfig(({ command, mode }) => {
  const { loadEnvs, resolve, getPublicPath } = utils;
  // 加载系统配置
  const config = loadEnvs(mode);
  const { VUE_APP_SERVICE_PORT } = config;
  // 加载插件
  const { plugins, options } = usePlugins(config, command);
  return {
    base: getPublicPath(config),
    plugins: plugins,
    ...options,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@micro': resolve('service/micro'),
        '@admin': resolve('service/admin'),
        '@common': resolve('service/common'),
        '@build': resolve('build'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    envPrefix: 'VUE_APP_',
    server: {
      host: '0.0.0.0',
      port: VUE_APP_SERVICE_PORT,
      proxy: configProxy(config),
    },
    optimizeDeps: {
      include: [
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
        '@ant-design/icons-vue',
      ],
    },
  };
});
