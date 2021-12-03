import { ajax } from '@jecloud/utils';
import { API_RBAC_LOGIN, API_RBAC_USER, API_SYSTEM_VARIABLES } from './urls';
import { useAxios } from '../hooks/use-axios';
// 格式数据
const { transformData } = useAxios();

/**
 * 登录
 *
 * @export
 * @param {Object} params
 * @return {Promise}
 */
export function doLogin(params) {
  return ajax({ url: API_RBAC_LOGIN, params: params }).then(transformData);
}
/**
 * 获取当前用户
 *
 * @export
 * @return {Object}
 */
export function getCurrentUser() {
  return ajax({ url: API_RBAC_USER }).then(transformData);
}

/**
 * 获取系统变量
 *
 * @export
 * @return {Object}
 */
export function getSystemConfig() {
  return ajax({ url: API_SYSTEM_VARIABLES }).then(transformData);
}
