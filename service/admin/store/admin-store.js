import { defineStore } from 'pinia';
import { mitt } from '@jecloud/utils';
import { useJE } from '@common/helper/je';
import { useGlobalStore } from '@common/store/global-store';
import MicroModel from './models/micro-model';
export const useAdminStore = defineStore({
  id: 'admin-store',
  state: () => ({
    apps: new Map(),
    appStores: new Map(),
    emitter: mitt(),
  }),
  getters: {
    globalStore() {
      return useGlobalStore();
    },
  },
  actions: {
    /**
     * 触发微应用事件
     * @param args
     */
    emitMicro(...args) {
      this.appStores.forEach((store) => {
        store.emitter.emit(...args);
      });
    },
    /**
     * 触发微应用事件
     * @param args
     */
    emit(...args) {
      this.emitter.emit(...args);
    },
    /**
     * 绑定主应用事件，供子应用触发调用
     * @param args
     */
    on(...args) {
      this.emitter.on(...args);
    },
    go(path) {
      const { $router } = useJE();
      // $router.push(path);
    },
    /**
     * 安装子应用数据
     *
     * @param {*} apps
     */
    setupApps(apps) {
      apps.forEach((app) => {
        const microApp = new MicroModel(app);
        this.apps.set(microApp.name, microApp);
      });
    },
    /**
     * 安装子应用
     *
     * @param {*} name
     * @param {*} store
     */
    setupMicro(name, store) {
      this.appStores.set(name, store);
    },
  },
});
