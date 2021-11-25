import { t } from '@micro/hooks/use-i18n';
import routes4bus from '@/router';
const routes = [
  {
    path: '/login',
    name: 'Login',
    text: t('menu.login'),
    component: () => import('../views/login/index.vue'),
  },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   text: t('menu.icons'),
  //   component: () => import('../views/icons/index.vue'),
  // },
  {
    path: '/icons',
    name: 'Icons',
    redirect: '/icons.html',
    text: t('menu.icons'),
  },
];
/**
 * 路由
 *
 * @export
 * @return {*}
 */
export function getRoutes() {
  return [...routes4bus, ...routes];
}
