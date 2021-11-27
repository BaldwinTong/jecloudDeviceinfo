import { createApp } from 'vue';
import { setupRouter } from './hooks/use-router';
import { setupAxios } from './hooks/use-axios';
import { setupJE } from './hooks/use-je';
import { setupIi8n } from './hooks/use-i18n';
import { setupStore } from './hooks/use-store';
import { useJE } from './hooks/use-je';
import { setupTheme } from './hooks/use-theme';
import { useMicroStore, setupMicroStore } from './store/micro-store';
import '@micro/assets/styles/index.less';

/**
 * qiankun全局变量
 */
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

let microCallback = () => {};
let microApp;
let useRouter = true;

/**
 * 是否微应用
 *
 * @export
 * @return {*}
 */
export function isMicro() {
  return !!window.__POWERED_BY_QIANKUN__;
}
/**
 * 安装应用
 *
 * @param {*} app
 * @param {*} callback
 */
async function setup({ app, router = true, callback }) {
  microApp = app;
  microCallback = callback;
  useRouter = router;
  if (!isMicro()) {
    render(app);
  }
}

/**
 *
 * 初始化微应用
 *
 * @export
 * @param {Object} app 入口页面
 * @returns {Vue}
 */
async function render(app, container) {
  const store = useMicroStore();
  const appid = '#app';
  // Init Vue
  const vue = createApp(app, store?.props);
  // JE
  setupJE(vue);
  // Axios
  setupAxios(vue);
  // Router
  useRouter && setupRouter(vue, store);
  // Store
  setupStore(vue);
  // I18n
  await setupIi8n(vue);
  // theme
  setupTheme();
  // 渲染页面
  vue.mount(container ? container.querySelector(appid) : appid);
  // 回调
  microCallback(vue);
  return vue;
}

/*---------------------------Micro生命周期钩子函数---------------------------*/
async function bootstrap({ store }) {}
async function mount({ container, store }) {
  setupMicroStore(store);
  render(microApp, container);
}
async function unmount() {
  let { $vue: instance, $router: router } = useJE();
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
}
async function update(props) {
  console.log('update props', props);
}
function useHooks() {
  return {
    bootstrap,
    mount,
    unmount,
    update,
  };
}
export default {
  setup,
  useHooks,
};
