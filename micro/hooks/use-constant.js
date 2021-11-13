import * as constant from '@micro/helper/constant';

/**
 * 获取系统变量
 *
 * @export
 * @return {*}
 */
export function useConstant() {
  const { CLI_ENVS, ...vars } = constant;
  return {
    ...CLI_ENVS,
    ...vars,
  };
}
