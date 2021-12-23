/**
 * Micro生命周期钩子函数
 */

import { useJE } from '@common/helper/je';
import { setupGlobalStore } from '@common/store/global-store';
import { setupMicroStore } from '../store/micro-store';

/**
 * 微应用渲染函数
 */
let _render;

/**
 * 初始化
 *
 * @param {*} { store }
 */
async function bootstrap({ store }) {
  setupGlobalStore(store);
}

/**
 * 实例化
 *
 * @param {*} { container, store }
 */
async function mount({ name, container, store }) {
  _render(container);
  setupMicroStore(name, store);
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
