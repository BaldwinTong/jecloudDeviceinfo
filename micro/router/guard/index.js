import { cookie, isEmpty } from '@jecloud/utils';
import { initSystemInfo } from '@micro/helper/system';
import { useGlobalStore } from '@micro/store/global-store';

// 路由白名单
const whiteList = ['Login'];
/**
 *注册路由守卫
 *
 * @export
 * @param {Router} router
 */
export function createRouterGuard(router, store) {
  router.beforeEach((to, from, next) => {
    const globalStore = useGlobalStore();
    const authorization = cookie.get('authorization');
    globalStore.toggleLoginState(false);
    if (whiteList.includes(to.name)) {
      next();
      return;
    }
    if (isEmpty(authorization)) {
      next({ name: 'Login' });
      return;
    }
    globalStore.toggleLoginState(true);
    globalStore.route = to.name;
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
  // 微应用路由与主应用保持一致
  router.afterEach((to, from, failure) => {
    if (!failure) {
      store?.go(to.path);
    }
  });
}
