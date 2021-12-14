import { createPinia } from 'pinia';
import { mixinJE } from '@micro/helper/je';

const store = createPinia();
export function setupStore(app) {
  app.use(store);
  mixinJE({ $store: store });
}
