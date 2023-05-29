import * as Vue from 'vue';
import * as Utils from '@jecloud/utils';
import * as Ui from '@jecloud/ui';
import { FuncUtil } from '@jecloud/func';
import { CLI_ENVS } from '@common/helper/constant';
/**
 * 使用全局工具类JE
 *
 * @export
 * @return { $vue,$i18n,$router,...utils }
 */
export function useJE() {
  return Utils.useJE();
}

/**
 * 初始化JE工具类
 * 页面可以通过JE.调用utils里的所有工具函数
 */
export async function setupJE(vue) {
  const JE = Utils.setupJE(vue, { Ui, Utils, Vue, Func: FuncUtil, CLI_ENVS });
  // 绑定全局JE
  window.JE = window.JE || JE;
}

/**
 * 混入到JE方法和变量
 *
 * @export
 * @param {*} object
 * @return {*}
 */
export function mixinJE(object) {
  return Utils.mixinJE(object);
}
