import { defineConfig } from 'vite';
import { usePlugins, resolve, loadEnvs } from './build/vite/plugins';
import { configProxy } from './build/vite/proxy';

export default defineConfig(({ command, mode }) => {
  // 加载系统配置
  const config = loadEnvs(mode);
  const { VUE_APP_SERVE_PORT } = config;
  // 加载插件
  const { plugins, lessModifyVars } = usePlugins(config, command);
  return {
    plugins: plugins,
    define: { __CLI_ENVS__: JSON.stringify(config) },
    resolve: {
      alias: {
        '@': resolve('src'),
        '@micro': resolve('micro'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
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
      port: VUE_APP_SERVE_PORT,
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