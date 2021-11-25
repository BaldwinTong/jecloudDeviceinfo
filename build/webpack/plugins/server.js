/**
 * 服务配置
 */
module.exports = {
  config(envs) {
    const { VUE_APP_SERVE_PORT, VUE_APP_SERVE_PROXY, VUE_APP_SERVE_PROXY_PREFIX } = envs;
    return {
      devServer: {
        port: VUE_APP_SERVE_PORT,
        host: '0.0.0.0',
        headers: {
          // 微应用，允许跨域
          'Access-Control-Allow-Origin': '*',
        },
        proxy: {
          [VUE_APP_SERVE_PROXY_PREFIX]: {
            // 代理地址
            target: VUE_APP_SERVE_PROXY,
            pathRewrite: { [`^${VUE_APP_SERVE_PROXY_PREFIX}`]: '' },
          },
        },
      },
    };
  },
};
