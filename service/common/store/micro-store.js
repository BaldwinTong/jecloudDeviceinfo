import { defineStore } from 'pinia';
import { mitt } from '@jecloud/utils';

/**
 * 微应用store
 */
let microStore;

/**
 * 安装store，子应用使用
 *
 * @export
 * @param {*} store
 */
export function setupMicroStore(store) {
  microStore = store;
}
/**
 * 微应用store，子应用使用
 * @returns
 */
export function useMicroStore() {
  if (microStore) return microStore;
  return usePrivateMicroStore();
}

/**
 * 微应用store
 * 主应用使用，子应用无效
 * @param {*} name 微应用名称
 */
export function usePrivateMicroStore(name) {
  return defineMicroStore(name);
}

/**
 * 微应用store缓存
 */
const defineStores = new Map();
/**
 * 声明微应用store
 * @param {*} name
 * @returns
 */
function defineMicroStore(name) {
  const id = 'micro-store' + (name ? '-' + name : '');
  if (!defineStores.has(id)) {
    const store = defineStore({
      id,
      state: () => ({
        name,
        options: {}, // 微应用配置
        props: {}, // 微应用参数
        instance: null, // 微应用实例
        emitter: mitt(), // 微应用触发器
      }),
      getters: {},
      actions: {
        /**
         * 绑定子应用事件，供主应用调用
         * @param args
         */
        on(...args) {
          this.emitter.on(...args);
        },
        /**
         * 触发应用事件
         * @param args
         */
        emit(...args) {
          this.emitter.emit(...args);
        },
        /**
         * 触发主应用事件
         * 只有集成到主应用时起效，子应用默认空函数，兼容代码
         * 使用方式参考emit
         */
        emitAdmin() {},
      },
    });
    defineStores.set(id, store);
  }
  return defineStores.get(id)();
}
