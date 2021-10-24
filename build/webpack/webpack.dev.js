/**
 * webpack 开发环境配置文件
 */
const path = require('path');

module.exports = function (config) {
  // 由于使用了npm link，调用本地包，导致vue实例错误问题，所以声明vue为统一配置
  // 参考链接：https://issueexplorer.com/issue/vuejs/vue-next/4478
  config.resolve.alias
    .set('vue', path.resolve('./node_modules/vue'))
    .set('micro', path.resolve('./micro'));
  return config;
};
