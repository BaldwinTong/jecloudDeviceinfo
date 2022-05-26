import { setupAxios } from './http';
import * as Vue from 'vue';
import * as Utils from '@jecloud/utils';
import * as Ui from '@jecloud/ui';
/**
 * 使用全局工具类JE
 *
 * @export
 * @return { $vue,$i18n,$router,...utils }
 */
const JE = {
  useUi() {
    return Ui;
  },
  useUtils() {
    return Utils;
  },
  useVue() {
    return Vue;
  },
};
export function useJE() {
  return JE;
}

/**
 * 初始化JE工具类
 * 页面可以通过JE.调用utils里的所有工具函数
 */
export async function setupJE(vue) {
  setupAxios();
  mixinJE({ $vue: vue });
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
