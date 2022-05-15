import { createRouter } from 'vue-router';
import { createRouterGuard } from './guard';
import { mixinJE } from '../helper/je';

let router;
export function useRouter() {
  return router;
}
/**
 * 注册路由
 *
 * @export
 * @return {*}
 */
export function setupRouter(app, { history, routes, guards, whites }) {
  // 创建路由
  router = createRouter({ history, routes });
  // 路由守卫
  createRouterGuard({ router, whites, guards });
  // 注册路由
  app.use(router);
  // 注入JE
  mixinJE({ $router: router, $history: history });
}
