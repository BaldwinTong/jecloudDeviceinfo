// 参考链接：https://segmentfault.com/a/1190000040373313?utm_source=sf-similar-article
import { defineStore } from 'pinia';
import { SUPPORT_LOCALES } from '@micro/locales';

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'globalState',
  // state: 返回对象的函数
  state: () => ({
    login: false, // 登录状态
    locale: SUPPORT_LOCALES[0].code, // 默认语言
    route: 'Home', // 默认首页
  }),
  getters: {
    /**
     * 当前选中的菜单
     */
    activeMenus(state) {
      return [this.route];
    },
  },
  actions: {
    /**
     * 切换登录状态
     *
     * @param {*} login
     */
    toggleLoginState(login) {
      this.login = login;
    },
  },
});
