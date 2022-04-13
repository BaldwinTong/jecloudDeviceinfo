import routes from '@micro/router/routes'; // 默认路由
import { ref } from 'vue';

/**
 * 获取菜单
 *
 * @export
 * @return {*}
 */
export function useMenu() {
  const menus = [];
  routes.forEach((route) => {
    const { path, name, text, menu, redirect } = route;
    menu &&
      menus.push({
        path,
        name,
        text,
        redirect,
      });
  });
  return { menus: ref(menus) };
}
