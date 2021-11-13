import * as utils from '@jecloud/utils';
import { useConstant } from './use-constant';

/**
 * 初始化JE工具类
 * 页面可以通过JE.调用utils里的所有工具函数
 */
export function setupJE(vue) {
  window.JE = Object.assign({ $vue: vue, logout }, utils);
}

/**
 * 使用全局工具类JE
 *
 * @export
 * @return { $vue,$i18n,$router,...utils }
 */
export function useJE() {
  return window.JE || {};
}

/**
 * 混入到JE方法和变量
 *
 * @export
 * @param {*} object
 * @return {*}
 */
export function mixinJE(object) {
  return Object.assign(useJE(), object || {});
}

/**
 * 退出登录
 *
 * @export
 */
const { JE_SETTINGS_LOGOUT_URL } = useConstant();
export function logout() {
  const { cookie } = utils;
  const router = useJE().$router;
  cookie.remove('authorization');
  if (router) {
    router.push(JE_SETTINGS_LOGOUT_URL);
  } else {
    window.location.href = JE_SETTINGS_LOGOUT_URL;
  }
}
