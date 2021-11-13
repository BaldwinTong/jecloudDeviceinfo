import micro from '@micro';
import App from './app.vue';

// 初始微应用
micro.setup(App).then(function (vue) {
  // vue 实例，可以进行相关业务操作
  console.log(vue);
});
