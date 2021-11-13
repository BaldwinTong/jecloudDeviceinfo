import { createApp } from 'vue';
import { setupRouter } from './hooks/use-router';
import { setupAxios } from './hooks/use-axios';
import { setupJE } from './hooks/use-je';
import { setupIi8n } from './hooks/use-i18n';
import { setupStore } from './hooks/use-store';
import '@micro/assets/styles/index.less';

/**
 *
 * 初始化微应用
 *
 * @export
 * @param {Object} app 入口页面
 * @returns {Vue}
 */
async function setup(app) {
  // Init Vue
  const vue = createApp(app);
  // JE
  setupJE(vue);
  // Axios
  setupAxios(vue);
  // Router
  setupRouter(vue);
  // Store
  setupStore(vue);
  // I18n
  await setupIi8n(vue);
  // 渲染页面
  vue.mount('#app');
  return vue;
}

export default {
  setup,
};
