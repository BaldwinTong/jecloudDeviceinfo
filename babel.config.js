const utils = require('./build/utils');
const envs = utils.resolveEnvs(process.env);
// 开发环境，按需加载style，生产环境，有静态资源处理
const dev = envs.NODE_ENV == 'development';
debugger;
const config = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: dev },
      'ant-design-vue',
    ],
    ['import', { libraryName: 'vxe-table', libraryDirectory: 'es', style: dev }, 'vxe-table'],
    ['import', { libraryName: '@jecloud/ui', libraryDirectory: 'src', style: dev }, '@jecloud/ui'],
    [
      'import',
      { libraryName: '@jecloud/func', libraryDirectory: 'src', style: dev },
      '@jecloud/func',
    ],
  ],
};
module.exports = config;
