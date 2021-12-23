import { useGlobalStore } from '@common/store/global-store';

export function createRouterGuard(router) {
  createAuthGuard(router);
}

/**
 *认证路由守卫
 *
 * @export
 * @param {Router} router
 */
export function createAuthGuard(router) {
  const globalStore = useGlobalStore();
  // 路由白名单
  router.beforeEach((to, from, next) => {
    if (globalStore.whiteRoutes.includes(to.name)) {
      next();
      return;
    }
    if (!globalStore.token) {
      next({ name: 'Login' });
      return;
    }
    next();
  });
}
