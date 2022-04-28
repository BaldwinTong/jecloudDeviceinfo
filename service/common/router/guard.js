import { logout, isLogin } from '@common/helper/system';
import { whiteRoutes } from './routes-white';
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
  router.beforeEach((to, from, next) => {
    // 路由白名单，已经登录
    if (whiteRoutes.includes(to.name) || isLogin()) {
      next();
    } else {
      logout(next);
    }
  });
}
