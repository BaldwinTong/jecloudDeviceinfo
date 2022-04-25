import { createMemoryHistory, createWebHashHistory } from 'vue-router';
import { setupRouter as _setupRouter } from '@common/router';
import routes from './routes';
import { createRouterGuard } from './guard';
import * as routerInfo from '@/router';
import { useMicroStore } from '@common/store/micro-store';

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
    routes: routes,
    guards: routerInfo.createRouterGuard || createRouterGuard,
    history:
      routerInfo.createRouterHistory?.() ??
      (isMicro ? createMemoryHistory() : createWebHashHistory()),
  });
}
