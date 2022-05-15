import { logout, initSystem } from '@common/helper/system';

export function createRouterGuard(options) {
  // 自定义守卫
  const { guards, router } = options;
  if (guards?.(router) !== false) {
    createAuthGuard(options);
  }
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
    if (whiteRoutes.includes(to.name)) {
      next();
    } else {
      // 初始化系统数据
      initSystem(router, to)
        .then(() => {
          next();
        })
        .catch(() => {
          logout();
        });
    }
  });
}
