const config = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: false },
      'ant-design-vue',
    ],
    ['import', { libraryName: 'vxe-table', libraryDirectory: 'es', style: false }, 'vxe-table'],
    // ['import', { libraryName: '@jecloud/ui', libraryDirectory: 'src', style: dev }, '@jecloud/ui'],
  ],
};
module.exports = config;
