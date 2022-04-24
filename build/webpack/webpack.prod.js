/**
 * webpack 生产环境配置文件
 */
const { buildHtmlTags, buildExternals } = require('../public/gulp');
const { resolve } = require('../utils');
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
      // .test((file) => {
      //   if (
      //     file.includes('vxe-table') &&
      //     (file.endsWith('.css') || file.endsWith('.scss') || file.endsWith('.less'))
      //   ) {
      //     console.log(file);
      //   }
      //   return false;
      // })
      .use('null-loader')
      .loader('null-loader')
      .end();

    return config;
  },
  config(config) {
    return Object.assign(config, {
      externals: buildExternals(),
    });
  },
};
