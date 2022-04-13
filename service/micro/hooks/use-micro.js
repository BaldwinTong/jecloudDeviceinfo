/**
 * Micro生命周期钩子函数
 */

import { useJE } from '@common/helper/je';
import { setupGlobalStore } from '@common/store/global-store';
import { setupMicroStore } from '@common/store/micro-store';
import { updateAxiosInstance } from '@jecloud/utils';

/**
 * 安装微应用
 * @param {*} param0
 */
function setMicro({ microStore, globalStore, axiosInstance }) {
  // 更新axios实例，使用与主应用相同的axios
  updateAxiosInstance(axiosInstance);
  // 安装全局store，使用与主应用相同的globalStore
  setupGlobalStore(globalStore);
  // 安装微应用store，用于与主应用交互
  setupMicroStore(microStore);
}

/**
 * 微应用渲染函数
 */
let _render;
/**
 * 初始化
 *
 * @param {*} { store }
 */
async function bootstrap(...args) {
  setMicro(...args);
}

/**
 * 实例化
 *
 * @param {*} { container, store }
 */
async function mount({ container }) {
  _render(container);
}

/**
 * 实例销毁
 *
 */
async function unmount() {
  let { $vue, $router } = useJE();
  $vue.unmount();
  $vue._container.innerHTML = '';
  $vue = null;
  $router = null;
}

/**
 * 更新内容
 *
 * @param {*} props
 */
async function update(props) {
  console.log('update props', props);
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
    bootstrap,
    mount,
    unmount,
    update,
  };
}
