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
    redirect: '/icons.html',
    text: t('menu.icons'),
  },
];

export default routes;
