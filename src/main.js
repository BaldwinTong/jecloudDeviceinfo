import micro from '@micro';
import ui from '@jecloud/ui';
import func from '@jecloud/func';
import App from './app.vue';

micro.setup({
  app: App,
  callback: (vue) => {
    // vue 实例，可以进行相关业务操作
    vue.use(ui).use(func);
  },
});

// 导出微应用钩子函数
export const { bootstrap, mount, unmount } = micro.useHooks();
