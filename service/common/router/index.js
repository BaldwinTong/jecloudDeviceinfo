import { createRouter } from 'vue-router';
import { createRouterGuard } from './guard';
import { mixinJE } from '../helper/je';

/**
 * 注册路由
 *
 * @export
 * @return {*}
 */
export function setupRouter(app, { history, routes, guards }) {
  // 创建路由
  const router = createRouter({ history, routes });
  // 基础路由守卫
  createRouterGuard(router);
  // 路由守卫
  guards?.(router);
  // 注册路由
  app.use(router);
  // 注入JE
  mixinJE({ $router: router });
}