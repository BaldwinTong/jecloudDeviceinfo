/**
 * Pinia 是一个用于 Vue 的状态管理库
 * 参考链接：https://segmentfault.com/a/1190000040373313?utm_source=sf-similar-article
 */

import { defineStore } from 'pinia';

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useAppStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'app-store',
  // state: 返回对象的函数
  state: () => ({}),
  getters: {},
  actions: {},
});
