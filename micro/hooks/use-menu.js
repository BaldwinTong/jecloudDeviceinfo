import routes from '@micro/router'; // 默认路由
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
    const { path, name, text } = route;
    name !== 'Login' &&
      menus.push({
        path,
        name,
        text,
      });
  });
  return { menus: ref(menus) };
}
