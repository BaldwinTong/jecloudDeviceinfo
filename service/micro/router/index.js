import { createMemoryHistory, createWebHashHistory } from 'vue-router';
import { setupRouter as _setupRouter } from '@common/router';
import * as customRouter from '@/router';
import { useMicroStore } from '@common/store/micro-store';
/**
 * 自定义路由
 */
export const routes = customRouter.default ?? customRouter.routes;

/**
 * 注册路由
 *
 * @export
 * @return {*}
 */
export function setupRouter(app, isMicro) {
  if (isMicro) {
    const microStore = useMicroStore();
    // 处理子应用激活路由，根据配置处理
    if (microStore?.options?.activeRoute) {
      const homeRoute = routes.find((route) => route.name === 'Home');
      homeRoute.redirect = microStore?.options?.activeRoute;
    }
  }

  _setupRouter(app, {
    routes,
    guards: customRouter.createRouterGuard,
    whites: customRouter.whiteRoutes,
    history:
      customRouter.createRouterHistory?.() ??
      (isMicro ? createMemoryHistory() : createWebHashHistory()),
  });
}
