import { setupAjax } from './http';
import { pick } from '@jecloud/utils';
import * as Vue from 'vue';
import * as Utils from '@jecloud/utils';
import * as Ui from '@jecloud/ui';
import { FuncUtil } from '@jecloud/func';
import { logout, isLogin } from './system';
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
  setupAjax();
  // 基础类库
  mixinJE({
    $vue: vue,
    useUi() {
      return Ui;
    },
    useUtils() {
      return Utils;
    },
    useVue() {
      return Vue;
    },
    useSystem() {
      return { ...FuncUtil, logout, isLogin, watchWebSocket() {} };
    },
  });
  // JE常用方法
  mixinJE({
    ...pick(FuncUtil, ['showFunc', 'showFuncForm', 'showFuncSelect', 'showTreeSelect']),
    ...pick(Ui.Modal, ['alert', 'confirm', 'dialog', 'message', 'notice', 'window']),
    ...pick(Utils, [
      'ajax',
      'isEmpty',
      'isNotEmpty',
      'getCurrentAccount',
      'getCurrentUser',
      'getSystemConfig',
    ]),
    log: (...args) => console.log(...args),
  });

  // utils注册JE，用于窗口提示
  Utils.setupJE(JE);
  // 绑定全局JE
  window.JE = window.JE || useJE();
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
