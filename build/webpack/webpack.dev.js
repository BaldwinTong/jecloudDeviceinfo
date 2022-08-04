/**
 * webpack 开发环境配置文件
 */
const utils = require('../utils');

module.exports = {
  chainWebpack({ config }) {
    // 由于使用了npm link，调用本地包，导致vue实例错误问题，所以声明vue为统一配置
    // 参考链接：https://issueexplorer.com/issue/vuejs/vue-next/4478
    config.resolve.alias.set('vue', utils.resolve('node_modules/vue'));
    return config;
  },
  /**
   * webpack配置项
   * @param {*} config
   * @returns
   */
  config(config) {
    return config;
  },
  /**
   * 脚手架配置项
   * @returns
   */
  vueCliConfig() {},
};
