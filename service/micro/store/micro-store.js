import { defineStore } from 'pinia';
import { mitt } from '@jecloud/utils';

/**
 * 安装store
 *
 * @export
 * @param {*} app 子应用名称
 * @param {*} adminStore 主应用store
 */
export function setupMicroStore(app, adminStore) {
  const microStore = useMicroStore();
  microStore.setupAdmin(app, adminStore);
}

/**
 * 微应用store
 * @param app 微应用配置
 * @param store 全局store
 * @returns microStore
 */
export const useMicroStore = defineStore({
  id: 'micro-store',
  state: () => ({
    name: '',
    adminStore: null,
    emitter: mitt(),
  }),
  getters: {
    props(state) {
      return state.app?.props;
    },
    app(state) {
      return this.adminStore?.apps.get(state.name);
    },
    /**
     * 支持的事件表
     * @returns
     */
    emits() {
      return [];
    },
  },
  actions: {
    /**
     * 更新主应用路由
     * @param path
     */
    go(path) {
      if (this.app) {
        const _path = this.app.path + (path === '/' ? '' : path);
        this.adminStore?.go(_path);
      }
    },
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
     * @param args
     */
    emitHost(...args) {
      this.adminStore?.emit(...args);
    },
    /**
     * 安装主应用
     *
     * @param {*} name
     * @param {*} store
     */
    setupAdmin(name, store) {
      this.name = name;
      this.adminStore = store;
      this.adminStore.setupMicro(name, this);
    },
  },
});
