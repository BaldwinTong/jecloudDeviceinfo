import * as routes from './index';
import * as homeRoutes from '@/router';

const menus = [];
[...homeRoutes.default, ...routes.default].forEach((route) => {
  const { path, name, text } = route;
  name !== 'Login' &&
    menus.push({
      path,
      name,
      text,
    });
});

export { menus };
