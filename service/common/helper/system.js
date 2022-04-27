import { getCurrentUser, getSystemConfig } from '../api';
import { useGlobalStore } from '../store/global-store';
import { useMicroStore } from '../store/micro-store';
import { JE_SETTINGS_LOGOUT_URL } from './constant';
import { useRouter } from '@common/router';
import { isMicro } from '@micro/helper';

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
 * 系统登录
 */
export function login(options) {
  // 微应用，触发主应用登录事件
  if (isMicro()) {
    const microStore = useMicroStore();
    // TODO: 临时数据，后期删除
    Object.assign(options, {
      token: 'YG6LYYksvjrVAUrwgPe',
      locale: 'zh_CN',
    });
    microStore.emitAdmin('login', options);
    return;
  }
  // 自应用，正常调用
  const globalStore = useGlobalStore();
  globalStore.login(options);
}
/**
 * 是否登录成功
 * @returns
 */
export function isLogin() {
  const globalStore = useGlobalStore();
  return !!globalStore.token;
}

/**
 * 退出登录
 *
 * @export
 */
export function logout() {
  const globalStore = useGlobalStore();
  globalStore.logout();
}
