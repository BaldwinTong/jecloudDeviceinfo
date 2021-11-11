import Home from '../views/index.vue';
import { t } from '@/locales';

const routes = [
  {
    path: '/',
    name: 'Home',
    text: t('menu.home'),
    component: Home,
  },
];

export default routes;
