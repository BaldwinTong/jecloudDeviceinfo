import { createApp } from 'vue';
import { setupCommon } from '@common/helper';
import { setupRouter } from './router';
import { useMicroHooks } from './hooks/use-micro';
import { isMicro } from './helper';

let _app; // 应用入口
let _router = true; // 使用路由
let _callback = () => {}; // 安装回调

/**
 * 安装应用
 *
 * @param {*} app
 * @param {*} callback
 */
async function setup({ app, router = true, callback }) {
  _app = app;
  _callback = callback;
  _router = router;

  // 如果是微应用，注册钩子函数
  if (isMicro()) {
    window[`micro-app-${window.__MICRO_APP_NAME__}`] = useMicroHooks(render);
  } else {
    // 直接渲染
    render();
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
async function render(container) {
  // Init Vue
  const vue = createApp(_app);
  // Common
  await setupCommon(vue);
  // Router
  _router && setupRouter(vue, isMicro());
  // Mount
  const appid = '#app';
  vue.mount(container ? container.querySelector(appid) : appid);
  // Callback
  _callback(vue);

  return vue;
}

export default {
  setup,
  useHooks() {
    return useMicroHooks(render);
  },
};
