import micro from '@micro';
import App from './app.vue';

micro.setup({
  app: App,
  callback: (vue) => {
    // vue 实例，可以进行相关业务操作
    console.log(vue);
  },
});

// 导出微应用钩子函数
export const { bootstrap, mount, unmount } = micro.useHooks();
