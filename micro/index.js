import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import microRoutes from './router';
import { registRouterEach } from './router/hook';
import { initAxios } from './api/axiois';
import { initJE } from './helper/utils';

// vue实例
export let vueInstance = null;
// router实例
export let routerInstance = null;
/**
 *
 * 初始化微应用
 *
 * @export
 * @param {Object} config
 * @returns {Vue}
 */
function init(config) {
  // 初始化JE全局变量
  initJE();
  // 初始化ajax默认配置
  initAxios();
  const { app, routes = [] } = config;
  const router = createRouter({
    history: createWebHashHistory(),
    routes: routes.concat(microRoutes),
  });
  registRouterEach(router);
  const vue = createApp(app).use(router).mount('#app');
  vueInstance = vue;
  routerInstance = router;
  return Promise.resolve(vue);
}

export default { init };
