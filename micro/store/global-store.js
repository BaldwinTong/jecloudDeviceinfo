import { defineStore } from 'pinia';
import { cookie, isNotEmpty } from '@jecloud/utils';
import { GlobalSettingsEnum } from '@micro/helper/constant';
import { useMicroStore } from './micro-store';
const { GLOBAL_SETTINGS_TOKENKEY, GLOBAL_SETTINGS_LOCALE } = GlobalSettingsEnum;

export function useGlobalStore() {
  // 子应用，使用主应用的全局store
  const microStore = useMicroStore();
  if (microStore?.globalStore) {
    return microStore?.globalStore;
  }
  const useStore = defineStore({
    id: 'global-store',
    state: () => ({
      init: false, // 系统初始状态
      whiteRoutes: ['Login'], // 路由白名单
      locale: cookie.get(GLOBAL_SETTINGS_LOCALE),
      token: cookie.get(GLOBAL_SETTINGS_TOKENKEY),
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
      // 系统路由
      isMainRoute(route) {
        return route.fullPath.startsWith('/main/');
      },
    },
  });
  return useStore();
}
