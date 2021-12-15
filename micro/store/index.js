import { createPinia } from 'pinia';
import { mixinJE } from '@micro/helper/je';

export function setupStore(app) {
  const store = createPinia();
  store.getStore = function (key) {
    return store._s.get(key);
  };
  app.use(store);
  mixinJE({ $store: store });
}
