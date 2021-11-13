import { defineConfig } from 'vite';
import { usePlugins, pathResolve, loadEnvs } from './build/vite/plugins.js';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载系统配置
  const config = loadEnvs(mode);
  const { VUE_APP_SERVE_PORT, VUE_APP_SERVE_PROXY, VUE_APP_SERVE_PROXY_PREFIX } = config;
  // 加载插件
  const { plugins, lessModifyVars } = usePlugins(config);
  return {
    plugins: plugins,
    resolve: {
      alias: {
        '@': pathResolve('src'),
        '@micro': pathResolve('micro'),
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
    },
  };
});
