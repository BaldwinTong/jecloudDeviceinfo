const { getMicroProxys } = require('../utils');
/**
 * 服务代理
 *
 * @export
 * @param {*} envs
 * @return {*}
 */
export function configProxy(envs) {
  // 代理地址，代理地址前缀
  const {
    VUE_APP_SERVICE_PROXY,
    VUE_APP_SERVICE_PROXY_PREFIX,
    VUE_APP_WEBSOCKET_PROXY,
    VUE_APP_WEBSOCKET_PROXY_PREFIX,
  } = envs;

  return {
    [VUE_APP_SERVICE_PROXY_PREFIX]: {
      // 代理地址
      target: VUE_APP_SERVICE_PROXY,
      changeOrigin: true,
      rewrite: (path) => path.replace(VUE_APP_SERVICE_PROXY_PREFIX, ''),
    },
    [VUE_APP_WEBSOCKET_PROXY_PREFIX]: {
      // websocket代理地址
      target: VUE_APP_WEBSOCKET_PROXY,
      ws: true,
      changeOrigin: true, // 如果需要跨域，设置为 true
    },
    // 微应用代理地址
    ...getMicroProxys(envs),
  };
}
