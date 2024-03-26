import { createApp } from 'vue';
import micro from '@micro';
import { setupCommon } from '@common/helper';
import { setupRouter } from '@micro/router';
import ui from '@jecloud/ui';
import func from '@jecloud/func';
import App from './app.vue';

micro.setup((container) => {
  // Init Vue
  const vue = createApp(App);
  // 注册组件
  vue.use(ui).use(func);
  // Common
  setupCommon(vue).then(() => {
    // Router
    setupRouter(vue);
    // Mount
    vue.mount(container);
  });
});
