import baseRoutes from '@common/router/routes';
import { t } from '@/locales';
import Home from '../views/index.vue';
/**
 * 基础路由
 * 如果有业务需要，可以自行调整
 * 固定路由：Home(/),Login(/login)
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    text: t('menu.home'),
    menu: true,
    component: Home,
  },
  ...baseRoutes,
];

export default routes;
