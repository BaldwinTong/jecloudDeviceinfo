const utils = require('./build/utils');
const envs = utils.resolveEnvs(process.env);
// 开发环境，按需加载style，生产环境，有静态资源处理
const dev = envs.NODE_ENV == 'development';
let plugins = [
  // ['import', { libraryName: 'vxe-table', libraryDirectory: 'es', style: false }, 'vxe-table'],
];
if (dev) {
  plugins = [
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true },
      'ant-design-vue',
    ],
    ['import', { libraryName: '@jecloud/ui', libraryDirectory: 'src', style: true }, '@jecloud/ui'],
  ].concat(plugins);
}
const config = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins,
};
module.exports = config;
