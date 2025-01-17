import styleImport from 'vite-plugin-style-import';

/**
 * 样式按需引入
 */
export function configStyleImportPlugin(envs, command) {
  return styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index.js`;
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
  });
}
