const config = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ['import', { libraryName: 'ant-design-vue', style: true }, 'ant-design-vue'],
    ['import', { libraryName: 'vxe-table', style: true }, 'vxe-table'],
  ],
};

const libs = ['@jecloud/ui']; // 私有包
let prod = process.env.NODE_ENV === 'production'; // 生产环境
prod = false; // TODO:先默认不使用jecloud包按需加载，后期稳定再加
// 生产环境
if (prod) {
  libs.forEach((lib) => {
    config.plugins.push(['import', { libraryName: lib, style: true }, lib]);
  });
}
module.exports = config;
