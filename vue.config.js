const webpack = require('./build/webpack/webpack.config');
const { VUE_APP_SERVE_PORT, VUE_APP_SERVE_PROXY, VUE_APP_SERVE_PROXY_PREFIX } = process.env;

module.exports = {
  devServer: {
    port: VUE_APP_SERVE_PORT,
    host: '0.0.0.0',
    proxy: {
      [VUE_APP_SERVE_PROXY_PREFIX]: {
        // 代理地址
        target: VUE_APP_SERVE_PROXY,
        pathRewrite: { [`^${VUE_APP_SERVE_PROXY_PREFIX}`]: '' },
      },
    },
  },
  chainWebpack: webpack.chainWebpack,
  ...webpack.config,
};
