import { createRouter, createWebHashHistory, createMemoryHistory } from 'vue-router';
import routes from './routes';
import { mixinJE } from '@micro/helper/je';
import { createRouterGuard } from './guard';
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
    routes: routes,
  });
  // 自定义路由守卫
  if (routerInfo.createRouterGuard) {
    routerInfo.createRouterGuard?.(router);
  } else {
    createRouterGuard(router, store);
  }
  app.use(router);
  mixinJE({ $router: router });
}
