/**
 * webpack 生产环境配置文件
 */
const { buildHtmlTags } = require('../public/gulp');

module.exports = function ({ config, envs }) {
  config.plugin('html-index').tap((args) => {
    const { libs, styles } = buildHtmlTags(envs);
    Object.assign(args[0], {
      libs: libs.join(''),
      styles: styles.join(''),
    });
    return args;
  });

  return config;
};
