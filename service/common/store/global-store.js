import { defineStore } from 'pinia';
import { cookie } from '@jecloud/utils';
import { GlobalSettingsEnum } from '../helper/constant';
const { GLOBAL_SETTINGS_TOKENKEY, GLOBAL_SETTINGS_LOCALE } = GlobalSettingsEnum;

// 主子应用共享
let globalStore;

/**
 * 安装全局store，子应用使用
 *
 * @export
 * @param {*} store
 */
export function setupGlobalStore(store) {
  globalStore = store.globalStore;
}

/**
 * 使用全局store
 *
 * @export
 * @return {*}
 */
export function useGlobalStore() {
  if (globalStore) return globalStore;

  const useStore = defineStore({
    id: 'global-store',
    state: () => ({
      init: false, // 系统初始状态
      whiteRoutes: ['Login'], // 路由白名单
      locale: cookie.get(GLOBAL_SETTINGS_LOCALE), // 激活语言
      token: cookie.get(GLOBAL_SETTINGS_TOKENKEY), // token
      user: null, // 当前用户
      systemConfig: null, // 系统变量
      axiosConfig: null, // ajax配置
    }),
    getters: {
      locales() {
        return [
          { code: 'zh_CN', text: '简体中文' },
          { code: 'en_US', text: 'English' },
        ];
      },
    },
    actions: {
      /**
       * 获得初始语言
       *
       * @return {*}
       */
      getInitLocale() {
        const locale = cookie.get(GLOBAL_SETTINGS_LOCALE);
        if (
          locale &&
          this.locales.find((item) => {
            return item.code === locale;
          })
        ) {
          return locale;
        }
        return this.locales[0].code;
      },
      /**
       * 设置语言
       *
       * @param {*} locale
       */
      setLocale(locale) {
        this.locale = locale;
        cookie.set(GLOBAL_SETTINGS_LOCALE, locale);
      },
      /**
       * 设置token
       *
       * @param {*} token
       */
      setToken(token) {
        this.token = token;
        cookie.set(GLOBAL_SETTINGS_TOKENKEY, token);
      },
      /**
       * 退出
       *
       */
      logout() {
        this.init = false;
        this.token = null;
        cookie.remove(GLOBAL_SETTINGS_TOKENKEY);
      },
    },
  });
  return useStore();
}
