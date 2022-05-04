import { logout, isLogin } from '@common/helper/system';

export function createRouterGuard(options) {
  createAuthGuard(options);
}

/**
 *认证路由守卫
 *
 * @export
 * @param {Router} router
 */
export function createAuthGuard({ router, whites = [] }) {
  // 路由白名单
  const whiteRoutes = ['Login', 'PlanLogin', ...whites];
  router.beforeEach((to, from, next) => {
    // 路由白名单，已经登录
    if (whiteRoutes.includes(to.name) || isLogin()) {
      next();
    } else {
      logout(next);
    }
  });
}
