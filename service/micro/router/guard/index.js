import { initSystem } from '@common/helper/system';
import { useMicroStore } from '../../store/micro-store';

/**
 *注册路由守卫
 *
 * @export
 * @param {Router} router
 */
export function createRouterGuard(router) {
  router.beforeEach((to, from, next) => {
    if (to.name === 'Home') {
      // 初始化系统数据
      initSystem()
        .then(() => {
          next();
        })
        .catch(() => {
          next({ name: 'Login' });
        });
      return;
    }
    next();
  });
  // 微应用路由与主应用保持一致
  router.afterEach((to, from, failure) => {
    const microStore = useMicroStore();
    if (!failure) {
      microStore.go(to.path);
    }
  });
}
