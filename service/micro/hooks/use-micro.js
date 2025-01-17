/**
 * Micro生命周期钩子函数
 */

import { useJE } from '@common/helper/je';
import { setupGlobalStore } from '@common/store/global-store';
import { setupMicroStore } from '@common/store/micro-store';
import { setAjaxInstance, setGlobalInterceptor } from '@jecloud/utils';

/**
 * 安装微应用
 * @param {*} param0
 */
function setMicro({ microStore, globalStore, ajaxInstance, globalInterceptor }) {
  // 更新全局拦截器，与主应用保持同步
  setGlobalInterceptor(globalInterceptor);
  // 更新ajax实例，使用与主应用相同的ajax
  setAjaxInstance(ajaxInstance);
  // 安装全局store，与主应用保持同步
  setupGlobalStore(globalStore);
  // 安装微应用store，用于与主应用交互
  setupMicroStore(microStore);
}

/**
 * 微应用渲染函数
 */
let renderMicro;

/**
 * 实例化
 *
 * @param {*} { container, store }
 */
async function mount({ container, props }) {
  setMicro(props);
  renderMicro(container);
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
  renderMicro = render;
  return {
    mount,
    unmount,
  };
}
