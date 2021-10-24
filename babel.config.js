const config = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ['import', { libraryName: 'ant-design-vue', style: true }, 'ant-design-vue'],
    ['import', { libraryName: 'vxe-table', style: true }, 'vxe-table'],
  ],
};

const libs = ['@jecloud/ui']; // 私有包
const npmLink = process.env.VUE_APP_LIBS_NPMLINK === 'true'; // 启用 npm link 依赖
const prod = process.env.NODE_ENV === 'production'; // 生产环境

// 生产环境 || 非npm link依赖，启用按需加载
if (prod || !npmLink) {
  libs.forEach((lib) => {
    config.plugins.push(['import', { libraryName: lib, style: true }, lib]);
  });
}
module.exports = config;
