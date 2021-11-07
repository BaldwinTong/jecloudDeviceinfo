import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
import vueJsx from '@vitejs/plugin-vue-jsx';
function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载系统配置
  const config = loadEnv(mode, process.cwd(), 'VUE_APP_');
  const { VUE_APP_SERVE_PORT, VUE_APP_SERVE_PROXY, VUE_APP_SERVE_PROXY_PREFIX } = config;
  return {
    plugins: [
      vue(),
      vueJsx(),
      styleImport({
        libs: [
          // TODO: 未作@jecloud/ui的按需加载，后续支持
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/css`;
            },
          },
          {
            libraryName: 'vxe-table',
            esModule: true,
            resolveStyle: (name) => {
              return `vxe-table/es/${name}/style.css`;
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': pathResolve('src'),
        micro: pathResolve('micro'),
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
    optimizeDeps: { include: ['ant-design-vue'] },
  };
});
