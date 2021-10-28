import micro from 'micro';
import App from './app.vue';
import routes from './router';

// 初始微应用
micro
  .init({
    app: App,
    routes,
  })
  .then(function (vue) {
    // vue 实例，可以进行相关业务操作
    console.log(vue);
  });
