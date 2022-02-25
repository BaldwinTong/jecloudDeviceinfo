import { createApp } from 'vue';
import { setupCommon } from '@common/helper';
import { setupRouter } from './router';
import { useMicroHooks } from './hooks/use-micro';
import { ConfigProvider } from '@jecloud/ui';
import { CLI_ENVS } from '@common/helper/constant';
import './helper/public-path';

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

  // 如果不是微应用，直接渲染
  if (!isMicro()) {
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
  // 注册 Vue
  ConfigProvider.setup({ appContext: vue, publicPath: CLI_ENVS.PUBLIC_PATH });
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

/**
 * 是否微应用
 *
 * @export
 * @return {*}
 */
export function isMicro() {
  return !!window.__POWERED_BY_QIANKUN__;
}

export default {
  setup,
  useHooks() {
    return useMicroHooks(render);
  },
};
