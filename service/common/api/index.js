import { ajax } from '@jecloud/utils';
import { API_RBAC_LOGIN, API_RBAC_USER, API_SYSTEM_VARIABLES } from './urls';
import { transformData } from '../helper/http'; // 格式数据

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
  return ajax({ url: API_RBAC_USER, method: 'GET' }).then(transformData);
}

/**
 * 获取系统变量
 *
 * @export
 * @return {Object}
 */
export function getSystemConfig() {
  return ajax({ url: API_SYSTEM_VARIABLES }, { headers: { pd: 'meta' } }).then(transformData);
}
