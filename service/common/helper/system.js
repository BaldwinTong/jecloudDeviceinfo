import { useGlobalStore } from '../store/global-store';
import { useMicroStore } from '../store/micro-store';
import { isMicro } from '@micro/helper';
import { initSystem as _initSystem } from '@jecloud/utils';
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
  const globalStore = useGlobalStore();
  return _initSystem().then(({ currentAccount, systemConfig }) => {
    Object.assign(globalStore, {
      currentAccount,
      systemConfig,
    });
  });
}

/**
 * 系统登录
 */
export function login(options) {
  // 微应用，触发主应用登录事件
  if (isMicro()) {
    const microStore = useMicroStore();
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
  return !!globalStore.getToken();
}

/**
 * 退出登录
 *
 * @export
 */
export function logout(next) {
  const globalStore = useGlobalStore();
  globalStore.logout();
  // 子应用路由处理
  if (isMicro() && next) {
    next({ name: 'Login' });
  }
}
