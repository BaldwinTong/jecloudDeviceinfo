const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
  },
  {
    path: '/icons',
    name: 'Icons',
    component: () => import(/* webpackChunkName: "login" */ '../views/icons/index.vue'),
  },
];

export default routes;
