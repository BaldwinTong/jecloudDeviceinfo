const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
  },
  {
    path: '/icons',
    name: 'Icons',
    component: () => import(/* webpackChunkName: "icons" */ '../views/icons/index.vue'),
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import(/* webpackChunkName: "demo" */ '../views/demo/index.vue'),
  },
];

export default routes;
