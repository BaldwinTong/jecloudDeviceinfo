import { defineConfig } from 'vite';
import { usePlugins, resolve, loadEnvs, utils } from './build/vite/plugins';
import { configProxy } from './build/vite/proxy';

export default defineConfig(({ command, mode }) => {
  // 加载系统配置
  const config = loadEnvs(mode);
  const { VUE_APP_SERVICE_PORT } = config;
  // 加载插件
  const { plugins, lessModifyVars } = usePlugins(config, command);
  return {
    base: utils.getPublicPath(config),
    plugins: plugins,
    define: { __CLI_ENVS__: JSON.stringify(config) },
    resolve: {
      alias: {
        '@': resolve('src'),
        '@micro': resolve('service/micro'),
        '@admin': resolve('service/admin'),
        '@common': resolve('service/common'),
        '@build': resolve('build'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: lessModifyVars,
          javascriptEnabled: true,
        },
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
