import { defineConfig, loadEnv } from 'vite';
import { usePlugins, pathResolve } from './build/vite/plugins';
import { generateModifyVars } from './build/theme/debug';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载系统配置
  const config = loadEnv(mode, process.cwd(), 'VUE_APP_');
  const { VUE_APP_SERVE_PORT, VUE_APP_SERVE_PROXY, VUE_APP_SERVE_PROXY_PREFIX } = config;
  return {
    plugins: usePlugins(config, false),
    resolve: {
      alias: {
        '@': pathResolve('src'),
        micro: pathResolve('micro'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          // modifyVars: generateModifyVars(), // TODO:主题调试放开
          javascriptEnabled: true,
        },
      },
    },
    envPrefix: 'VUE_APP_',
    server: {
      host: '0.0.0.0',
      port: VUE_APP_SERVE_PORT,
      proxy: {
        [VUE_APP_SERVE_PROXY_PREFIX]: {
          // 代理地址
          target: VUE_APP_SERVE_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(VUE_APP_SERVE_PROXY_PREFIX, ''),
        },
      },
    },
    optimizeDeps: {
      include: [
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
        '@ant-design/icons-vue',
      ],
      exclude: ['@zougt/vite-plugin-theme-preprocessor/dist/browser-utils'],
    },
  };
});
