import { mixinJE } from './je';
import { getCurrentUser, getSystemConfig } from '../api';
import { useGlobalStore } from '../store/global-store';
import { JE_SETTINGS_LOGOUT_URL } from './constant';
import { useJE } from './je';

/**
 * 初始化系统数据
 *
 * @export
 * @param {*} router
 * @param {*} route
 * @return {*}
 */
export function initSystem(router, route) {
  const globalStore = useGlobalStore();

  // 已经初始化数据，设置默认菜单
  if (globalStore.init) {
    return Promise.resolve();
  }

  // 初始系统数据
  return initSystemInfo().then(() => {
    // 系统数据初始化成功
    globalStore.init = true;
    // 返回系统登录成功后的跳转路由
    return { name: 'HOME' };
  });
}

/**
 * 初始化系统信息
 *
 * @export
 * @return {Promise}
 */
export function initSystemInfo() {
  return Promise.all([getCurrentUser(), getSystemConfig()]).then((data) => {
    const globalStore = useGlobalStore();
    globalStore.user = data[0];
    globalStore.systemConfig = data[1];
  });
}

/**
 * 退出登录
 *
 * @export
 */
export function logout() {
  const globalStore = useGlobalStore();
  globalStore.logout();
  const router = useJE().$router;
  if (router) {
    router.push(JE_SETTINGS_LOGOUT_URL);
  } else {
    window.location.href = JE_SETTINGS_LOGOUT_URL;
  }
}
