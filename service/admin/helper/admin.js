import { start, prefetchApps, loadMicroApp as _loadMicroApp } from 'qiankun';
import { loadMicroApps } from '@admin/api';
import { useAdminStore } from '@admin/store/admin-store';

/**
 * 注册微应用
 * @param router
 */
export function setupAdmin() {
  const adminStore = useAdminStore();
  return loadMicroApps().then((data) => {
    adminStore.setupApps(data.rows);
    const apps = toRawData(adminStore.apps);
    start();
    prefetchApps(apps);
    // registerMicroApps(apps);
  });
}

export function useMicro() {
  function mount(app) {
    // 注册微应用实例
    app.instance = loadMicroApp(app.toRaw());
  }

  function unmount(app) {
    app.instance?.unmount(); // 卸载微应用
  }

  return {
    mount,
    unmount,
  };
}

// 加载微应用
export function loadMicroApp(item) {
  return _loadMicroApp(item, { sandbox: { strictStyleIsolation: false } });
}

function toRawData(apps) {
  return Array.from(apps.values()).map((app) => {
    return app.toRaw();
  });
}
