import { ajax } from '@jecloud/utils';
import { API_RBAC_LOGIN } from './urls';
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
