import utils from '../../utils';

/**
 * 获取主题插件
 *
 * @export
 * @param {*} envs 系统变量
 * @return {*}
 */
export function useTheme(envs) {
  return {
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: utils.generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
  };
}
