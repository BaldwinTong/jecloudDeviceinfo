import { createRouter, createWebHashHistory, createMemoryHistory } from 'vue-router';
import { cookie, isEmpty } from '@jecloud/utils';
import { getRoutes } from '@micro/router';
import { initSystemInfo } from '../helper/utils';
import { mixinJE } from './use-je';
import { useGlobalStore } from '../store/global-store';
import * as routerInfo from '@/router';

/**
 * 注册路由
 *
 * @export
 * @return {*}
 */
export function setupRouter(app, store) {
  const router = createRouter({
    history: store?.micro ? createMemoryHistory() : createWebHashHistory(),
    routes: getRoutes(),
  });
  // 自定义路由守卫
  if (routerInfo.createRouterGuard) {
    routerInfo.createRouterGuard?.(router);
  } else {
    createRouterGuard4Micro(router, store);
  }
  app.use(router);
  mixinJE({ $router: router });
}
// 路由白名单
const whiteList = ['Login'];
/**
 *注册路由守卫
 *
 * @export
 * @param {Router} router
 */
export function createRouterGuard4Micro(router, store) {
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
