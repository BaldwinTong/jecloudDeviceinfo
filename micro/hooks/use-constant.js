import * as constant from '@micro/helper/constant';

/**
 * 获取系统变量
 *
 * @export
 * @return {*}
 */
export function useConstant() {
  const { CLI_ENVS, ...vars } = constant;
  // 微应用
  const BASE_URL = CLI_ENVS.VUE_APP_SERVE_PROXY_PREFIX || '';
  return {
    BASE_URL,
    ...CLI_ENVS,
    ...vars,
  };
}
