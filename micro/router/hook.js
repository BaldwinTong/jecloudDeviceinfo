import { cookie, isEmpty } from '@jecloud/utils';
import { initSystemInfo } from '../helper/utils';

/**
 *注册路由守卫
 *
 * @export
 * @param {Router} router
 */
export function registRouterEach(router) {
  router.beforeEach((to, from, next) => {
    const authorization = cookie.get('authorization');
    if (to.name !== 'Login' && isEmpty(authorization)) {
      next({ name: 'Login' });
      return;
    }
    if (to.name === 'Home') {
      // 初始化系统数据
      initSystemInfo()
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
}
