/**
 * webpack 配置文件统一入口
 */
const webpack = require('webpack');
const dev = require('./webpack.dev');
const prod = require('./webpack.prod');
const utils = require('../utils');
const { name } = require('../../package.json');
const envs = utils.resolveEnvs(process.env);

// 链式配置
const chainWebpack = function (config) {
  const {
    NODE_ENV, // 环境参数
  } = envs;

  // 设置别名
  config.resolve.alias.set('@micro', utils.resolve('service/micro'));
  config.resolve.alias.set('@admin', utils.resolve('service/admin'));
  config.resolve.alias.set('@common', utils.resolve('service/common'));
  // 设置i18n警告
  config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
  // antd图标按需加载
  // config.resolve.alias.set(
  //   '@ant-design/icons-vue/lib/icons',
  //   utils.resolve('service/common/assets/icons/antd-icons.js'),
  // );

  // 环境配置
  return NODE_ENV == 'development' ? dev(config) : prod(config);
};

// 简单配置
const configureWebpack = {
  plugins: [
    new webpack.DefinePlugin({
      __CLI_ENVS__: JSON.stringify(envs),
    }),
  ],
  // 微应用配置
  output: {
    library: `${name}-[name]`,
    libraryTarget: 'umd', // 把微应用打包成 umd 库格式
    jsonpFunction: `webpackJsonp_${name}`,
  },
};
module.exports = {
  config() {
    return {
      publicPath: utils.getPublicPath(envs),
      chainWebpack,
      configureWebpack,
    };
  },
};
