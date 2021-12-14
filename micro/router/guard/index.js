import { cookie, isEmpty } from '@jecloud/utils';
import { initSystem } from '@micro/helper/system';
import { useGlobalStore } from '@micro/store/global-store';

/**
 *注册路由守卫
 *
 * @export
 * @param {Router} router
 */
export function createRouterGuard(router, store) {
  router.beforeEach((to, from, next) => {
    const globalStore = useGlobalStore();
    if (globalStore.whiteRoutes.includes(to.name)) {
      next();
      return;
    }
    if (isEmpty(globalStore.token)) {
      next({ name: 'Login' });
      return;
    }
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
    if (!failure) {
      store?.go(to.path);
    }
  });
}
