const config = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: false },
      'ant-design-vue',
    ],
    ['import', { libraryName: 'vxe-table', libraryDirectory: 'es', style: false }, 'vxe-table'],
  ],
};
module.exports = config;
