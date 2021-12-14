import * as utils from '@jecloud/utils';
import { useGlobalStore } from '@micro/store/global-store';
import { JE_SETTINGS_LOGOUT_URL } from './constant';

/**
 * 使用全局工具类JE
 *
 * @export
 * @return { $vue,$i18n,$router,...utils }
 */
const JE = Object.assign({}, utils);
export function useJE() {
  return JE;
}

/**
 * 初始化JE工具类
 * 页面可以通过JE.调用utils里的所有工具函数
 */
export function setupJE(vue) {
  mixinJE({ $vue: vue, logout });
  window.JE = JE;
}

/**
 * 混入到JE方法和变量
 *
 * @export
 * @param {*} object
 * @return {*}
 */
export function mixinJE(object) {
  return Object.assign(JE, object || {});
}

/**
 * 退出登录
 *
 * @export
 */
export function logout() {
  const globalStore = useGlobalStore();
  globalStore.logout();
  const router = useJE().$router;
  if (router) {
    router.push(JE_SETTINGS_LOGOUT_URL);
  } else {
    window.location.href = JE_SETTINGS_LOGOUT_URL;
  }
}
