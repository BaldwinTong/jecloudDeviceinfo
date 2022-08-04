/**
 * webpack 配置文件统一入口
 */
const webpack = require('webpack');
const dev = require('./webpack.dev');
const prod = require('./webpack.prod');
const utils = require('../utils');
const envs = utils.resolveEnvs(process.env);

// 自定义配置
const customConfig = envs.NODE_ENV == 'development' ? dev : prod;

// 链式配置
const chainWebpack = function (config) {
  // 设置别名
  config.resolve.alias.set('@micro', utils.resolve('service/micro'));
  config.resolve.alias.set('@admin', utils.resolve('service/admin'));
  config.resolve.alias.set('@common', utils.resolve('service/common'));
  config.resolve.alias.set('@build', utils.resolve('build'));

  // 环境配置
  return customConfig.chainWebpack({ config, envs });
};

// 简单配置
const projectName = utils.getProjectName();
// 主应用
const configureWebpack = customConfig.config({
  plugins: [
    new webpack.DefinePlugin({
      __CLI_ENVS__: JSON.stringify(envs),
    }),
  ],
  // 微应用配置
  output: {
    library: `${projectName}`,
    libraryTarget: 'umd', // 把微应用打包成 umd 库格式
    jsonpFunction: `webpackJsonp_${projectName}`,
  },
});
module.exports = {
  config() {
    return {
      publicPath: utils.getPublicPath(envs),
      chainWebpack,
      configureWebpack,
      ...customConfig.vueCliConfig(),
    };
  },
};
