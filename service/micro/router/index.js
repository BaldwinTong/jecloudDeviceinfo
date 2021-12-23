import { createMemoryHistory, createWebHashHistory } from 'vue-router';
import { setupRouter as _setupRouter } from '@common/router';
import routes from './routes';
import { createRouterGuard } from './guard';
import * as routerInfo from '@/router';

/**
 * 注册路由
 *
 * @export
 * @return {*}
 */
export function setupRouter(app, isMicro) {
  _setupRouter(app, {
    history: isMicro ? createMemoryHistory() : createWebHashHistory(),
    routes: routes,
    guards: routerInfo.createRouterGuard || createRouterGuard,
  });
}
