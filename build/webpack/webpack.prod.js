/**
 * webpack 生产环境配置文件
 */
const { buildHtmlTags, buildExternals } = require('../public/gulp');
const { resolve } = require('../utils');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  chainWebpack({ config, envs }) {
    config.plugin('html-index').tap((args) => {
      const { libs, styles } = buildHtmlTags(envs);
      Object.assign(args[0], {
        libs: libs.join(''),
        styles: styles.join(''),
      });
      return args;
    });
    // 排除公共资源文件，单独打包
    config.module
      .rule('externals')
      .test(resolve('service/common/assets/externals.js'))
      .use('null-loader')
      .loader('null-loader')
      .end();

    return config;
  },
  /**
   * webpack配置项
   * @param {*} config
   * @returns
   */
  config(config) {
    return Object.assign(config, {
      externals: buildExternals(),
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              output: { comments: false },
            },
          }),
        ],
      },
    });
  },
  /**
   * 脚手架配置项
   * @returns
   */
  vueCliConfig() {
    return {
      productionSourceMap: false,
    };
  },
};
