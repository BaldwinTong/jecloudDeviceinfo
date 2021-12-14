import { t } from '@micro/locales';
import routes4custom from '@/router';
const routes = [
  {
    path: '/login',
    name: 'Login',
    text: t('menu.login'),
    component: () => import('@micro/views/login/index.vue'),
  },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   text: t('menu.icons'),
  //   component: () => import('@micro/views/icons/index.vue'),
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
export default [...routes4custom, ...routes];
