import { defineStore } from 'pinia';
import { cookie, mitt, setSystemInfo } from '@jecloud/utils';
import { GlobalSettingsEnum, JE_SETTINGS_LOGOUT_URL } from '../helper/constant';
import { useRouter } from '@common/router';
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
  globalStore = store;
  // 初始化系统信息，共享主应用数据
  setSystemInfo(store);
}

/**
 * 使用全局store
 *
 * @export
 * @return {*}
 */
export function useGlobalStore() {
  if (globalStore) return globalStore;
  return usePrivateGlobalStore();
}

/**
 * 私有全局store
 */
const usePrivateGlobalStore = defineStore({
  id: 'global-store',
  state: () => ({
    init: false, // 系统初始状态
    whiteRoutes: ['Login'], // 路由白名单
    historyRoute: null, // 退出前的路由fullPath，用于登录成功后再次打开
    locale: cookie.get(GLOBAL_SETTINGS_LOCALE), // 激活语言
    token: cookie.get(GLOBAL_SETTINGS_TOKENKEY), // token
    tokenKey: GLOBAL_SETTINGS_TOKENKEY, // token属性值
    currentAccount: null, // 当前账号
    systemConfig: null, // 系统变量
    ddCache: null, // 字典信息缓存
    plans: new Map(), // 方案配置
    activePlan: 'je', // 激活方案，默认je
    emitter: mitt(), // 事件触发器
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
     * 初始化系统信息
     * @param {*} param0
     */
    initSystem({ currentAccount, systemConfig, ddCache }) {
      this.currentAccount = currentAccount;
      this.systemConfig = systemConfig;
      this.ddCache = ddCache;
    },
    /**
     * 绑定子应用事件，供主应用调用
     * @param args
     */
    on(...args) {
      this.emitter.on(...args);
    },
    /**
     * 触发应用事件
     * @param args
     */
    emit(...args) {
      return this.emitter.emit(...args);
    },
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
      if (token) {
        cookie.set(GLOBAL_SETTINGS_TOKENKEY, token);
      } else {
        cookie.remove(GLOBAL_SETTINGS_TOKENKEY);
      }
    },
    /**
     * 获取token
     * @returns
     */
    getToken() {
      return cookie.get(GLOBAL_SETTINGS_TOKENKEY);
    },
    /**
     * 登录
     * @param {*} param0
     */
    login({ token, locale, route = 'Home' }) {
      // 更改语言
      this.setLocale(locale ?? this.locale);
      // token
      this.setToken(token);
      // 触发登录事件
      if (this.emit('login') !== false) {
        // 初始路由
        const router = useRouter();
        // 登录成功，跳转首页
        router.push({ name: route });
      }
    },
    /**
     * 退出
     *
     */
    logout() {
      // 重置状态
      this.init = false;
      // 重置token
      this.setToken();
      // 触发注销事件
      if (this.emit('logout') !== false) {
        // 路由处理
        const router = useRouter();
        // 退出路由
        if (router) {
          router.push(JE_SETTINGS_LOGOUT_URL);
        } else {
          window.location.href = JE_SETTINGS_LOGOUT_URL;
        }
      }
    },
    /**
     * 获取当前激活方案的配置项
     * @param {*} key
     * @returns
     */
    getPlanConfig(key) {
      return this.plans.get(this.activePlan)?.[key];
    },
  },
});
