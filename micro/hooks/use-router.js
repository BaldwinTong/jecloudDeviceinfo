import { createRouter, createWebHashHistory } from 'vue-router';
import { cookie, isEmpty } from '@jecloud/utils';
import routes from '@micro/router';
import { initSystemInfo } from '../helper/utils';
import { mixinJE } from './use-je';
import { useGlobalStore } from '../store/global-store';
/**
 * 注册路由
 *
 * @export
 * @return {*}
 */
export function setupRouter(app) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes: routes.concat(routes),
  });
  registRouterEach(router);
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
export function registRouterEach(router) {
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
}
