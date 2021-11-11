import { t } from '@/locales';
const routes = [
  {
    path: '/login',
    name: 'Login',
    text: t('menu.login'),
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
  },
  {
    path: '/icons',
    name: 'Icons',
    text: t('menu.icons'),
    component: () => import(/* webpackChunkName: "icons" */ '../views/icons/index.vue'),
  },
];

export default routes;
