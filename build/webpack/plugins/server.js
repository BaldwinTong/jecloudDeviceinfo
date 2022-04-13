const { getMicroProxys } = require('../../utils');
/**
 * 服务配置
 */
module.exports = {
  config(envs) {
    const { VUE_APP_SERVICE_PORT, VUE_APP_SERVICE_PROXY, VUE_APP_SERVICE_PROXY_PREFIX } = envs;
    return {
      devServer: {
        port: VUE_APP_SERVICE_PORT,
        host: '0.0.0.0',
        headers: {
          // 微应用，允许跨域
          'Access-Control-Allow-Origin': '*',
        },
        proxy: {
          [VUE_APP_SERVICE_PROXY_PREFIX]: {
            // 代理地址
            target: VUE_APP_SERVICE_PROXY,
            pathRewrite: { [`^${VUE_APP_SERVICE_PROXY_PREFIX}`]: '' },
          },
          ...getMicroProxys(envs),
        },
      },
    };
  },
};
