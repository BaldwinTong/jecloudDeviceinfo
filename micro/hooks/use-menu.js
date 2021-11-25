import { getRoutes } from '@micro/router'; // 默认路由
import { ref } from 'vue';

/**
 * 获取菜单
 *
 * @export
 * @return {*}
 */
export function useMenu() {
  const menus = [];
  getRoutes().forEach((route) => {
    const { path, name, text, redirect } = route;
    name !== 'Login' &&
      menus.push({
        path,
        name,
        text,
        redirect,
      });
  });
  return { menus: ref(menus) };
}
