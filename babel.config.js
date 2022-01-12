const config = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ['import', { libraryName: 'ant-design-vue', style: true }, 'ant-design-vue'],
    ['import', { libraryName: 'vxe-table', style: true }, 'vxe-table'],
    ['import', { libraryName: '@jecloud/ui', libraryDirectory: 'src', style: true }, '@jecloud/ui'],
  ],
};
module.exports = config;
