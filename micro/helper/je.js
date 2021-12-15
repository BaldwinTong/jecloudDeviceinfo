import * as utils from '@jecloud/utils';

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
  mixinJE({ $vue: vue });
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
