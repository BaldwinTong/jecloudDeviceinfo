/**
 * webpack 配置文件统一入口
 */
const dev = require('./webpack.dev');
const prod = require('./webpack.prod');
const utils = require('../utils');
const envs = utils.loadEnvs();
const version = envs.VUE_APP_VERSION;

// 自定义配置
const customConfig = envs.NODE_ENV == 'development' ? dev : prod;

// 链式配置
const chainWebpack = function (config) {
  // 设置别名
  config.resolve.alias.set('@micro', utils.resolve('service/micro'));
  config.resolve.alias.set('@admin', utils.resolve('service/admin'));
  config.resolve.alias.set('@common', utils.resolve('service/common'));
  config.resolve.alias.set('@build', utils.resolve('build'));
  // 添加自定义loader
  config.module
    .rule('custom')
    .test(/\.js$/)
    .use('custom-loader')
    .loader(utils.resolve('build/webpack/plugins/vue.js'));

  // 环境配置
  return customConfig.chainWebpack({ config, envs });
};

// 简单配置
const projectName = utils.getProjectName();
// 主应用
const configureWebpack = customConfig.config({
  // 微应用配置
  output: {
    library: `${projectName}`,
    libraryTarget: 'umd', // 把微应用打包成 umd 库格式
    jsonpFunction: `webpackJsonp_${projectName}`, // 参考：https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/framework/vue?id=_2%e3%80%81%e8%ae%be%e7%bd%ae-webpackjsonpfunction
    filename: `js/[name].${version}.[hash:8].js`,
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
