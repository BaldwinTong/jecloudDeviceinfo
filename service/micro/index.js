import { useMicroHooks } from './hooks/use-micro';
import { isMicro } from './helper';

/**
 * 安装应用
 *
 * @param {*} app
 * @param {*} callback
 */
async function setup(render) {
  const appid = '#app';
  if (isMicro()) {
    // 如果是微应用，根据暴露的全局变量，注册钩子函数
    window[`micro-app-${window.__MICRO_APP_NAME__}`] = useMicroHooks((container) => {
      render(container.querySelector(appid));
    });
  } else {
    // 直接渲染
    render(appid);
  }
}

export default {
  setup,
};
