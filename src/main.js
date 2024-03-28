import { createApp } from 'vue';
import micro from '@micro';
import lifecycle from './helper/lifecycle';
import { setupCommon } from '@common/helper';
import App from './app.vue';

/* 系统文件，不做修改，请在lifecycle中进行业务处理 */
micro.setup((container) => {
  // Vue Init
  const vue = createApp(App);
  // VueInit Lifecycle
  lifecycle
    .onVueInit(vue)
    .then(() => setupCommon(vue)) // Common
    .then(() => lifecycle.onVueBeforeMount(vue)) // VueBeforeMount Lifecycle
    .then(() => {
      // Mount
      vue.mount(container);
    });
});
