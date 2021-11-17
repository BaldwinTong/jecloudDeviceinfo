/**
 * webpack 配置文件统一入口
 */
const dev = require('./webpack.dev');
const prod = require('./webpack.prod');
const utils = require('../utils');
const theme = require('./plugins/theme');
const envs = utils.resolveEnvs(process.env);
module.exports = {
  chainWebpack: function (config) {
    const {
      VUE_APP_HTML_TITLE, // 首页标题
      NODE_ENV, // 环境参数
    } = envs;

    // 通用配置
    config.entry('app').clear().add('./src/main.js');
    config.plugin('html').tap((args) => {
      Object.assign(args[0], {
        title: VUE_APP_HTML_TITLE,
        theme: theme.defaultTheme,
        envs: JSON.stringify(envs),
      });
      return args;
    });

    // 设置别名
    config.resolve.alias.set('@micro', utils.resolve('micro'));
    // 设置i18n警告
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');

    // 环境配置
    return NODE_ENV == 'development' ? dev(config) : prod(config);
  },
  config: {
    ...theme.config(envs),
  },
};
