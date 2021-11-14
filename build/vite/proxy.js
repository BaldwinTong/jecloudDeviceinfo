/**
 * 服务代理
 *
 * @export
 * @param {*} envs
 * @return {*}
 */
export function useProxy(envs) {
  // 代理地址，代理地址前缀
  const { VUE_APP_SERVE_PROXY, VUE_APP_SERVE_PROXY_PREFIX } = envs;

  return {
    [VUE_APP_SERVE_PROXY_PREFIX]: {
      // 代理地址
      target: VUE_APP_SERVE_PROXY,
      changeOrigin: true,
      rewrite: (path) => path.replace(VUE_APP_SERVE_PROXY_PREFIX, ''),
    },
  };
}
