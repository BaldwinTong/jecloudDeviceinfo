import { useMicroStore } from '@micro/store/micro-store';
import { setupAxios } from './http';

/**
 * 使用全局工具类JE
 *
 * @export
 * @return { $vue,$i18n,$router,...utils }
 */
const JE = {};
export function useJE() {
  return JE;
}

/**
 * 初始化JE工具类
 * 页面可以通过JE.调用utils里的所有工具函数
 */
export async function setupJE(vue) {
  const microStore = useMicroStore();
  // if (microStore) {
  //   mixinJE(microStore.JE);
  // } else {
  const utils = await import('@jecloud/utils');
  mixinJE(utils);
  setupAxios();
  // }
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
