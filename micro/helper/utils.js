import * as utils from '@jecloud/utils';
import { getCurrentUser, getSystemConfig } from '../api';
import { routerInstance } from '../index';

/**
 * 初始化JE工具类
 * 页面可以通过JE.调用utils里的所有工具函数
 *
 * @export
 */
export function initJE() {
  window.JE = Object.assign({}, utils);
}

/**
 * 初始化系统信息
 *
 * @export
 * @return {Promise}
 */
export function initSystemInfo() {
  return Promise.all([getCurrentUser(), getSystemConfig()]).then((data) => {
    Object.assign(JE, {
      USER: data[0],
      systemConfig: data[1],
    });
  });
}

export function logout() {
  routerInstance.push('/login');
  // window.location.href = '/#/login';
}
