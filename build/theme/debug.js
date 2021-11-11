import { getThemeVariables } from 'ant-design-vue/dist/theme';
/**
 * 获取ant less变量
 *
 * @export
 * @param {*} dark
 * @return {*}
 */
export function generateModifyVars(dark) {
  const modifyVars = getThemeVariables({ dark });
  return {
    ...modifyVars,
    'vxe-primary-color': '#3265f5', // 主题色
  };
}
