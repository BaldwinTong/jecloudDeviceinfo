/**
 * Micro生命周期钩子函数
 */

import { useJE } from '@common/helper/je';
import { setupGlobalStore } from '@common/store/global-store';
import { setupMicroStore } from '@common/store/micro-store';
import { setGlobalInterceptor } from '@jecloud/utils';

/**
 * 安装微应用
 * @param {*} param0
 */
function setMicro({ microStore, globalStore, globalInterceptor }) {
  // 更新全局拦截器，与主应用保持同步
  setGlobalInterceptor(globalInterceptor);
  // 安装全局store，与主应用保持同步
  setupGlobalStore(globalStore);
  // 安装微应用store，用于与主应用交互
  setupMicroStore(microStore);
}

/**
 * 微应用渲染函数
 */
let _render;

/**
 * 实例化
 *
 * @param {*} { container, store }
 */
async function mount({ container, props }) {
  setMicro(props);
  await _render(container);
}

/**
 * 实例销毁
 *
 */
async function unmount() {
  let { $vue, $router, $history } = useJE();
  $vue.unmount();
  $vue._container.innerHTML = '';
  $vue = null;
  $router = null;
  $history.destroy();
}

/**
 * 微应用钩子函数
 *
 * @export
 * @param {*} config
 * @return {*}
 */
export function useMicroHooks(render) {
  _render = render;
  return {
    mount,
    unmount,
  };
}
