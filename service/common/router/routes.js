import { t } from '../locales';
const routes = [
  {
    path: '/login',
    name: 'Login',
    text: t('menu.login'),
    component: () => import('@common/views/login/index.vue'),
  },
  {
    path: '/icons',
    name: 'Icons',
    menu: true,
    text: t('menu.icons'),
    component: () => import('@common/components/icon.vue'),
  },
];

export default routes;
