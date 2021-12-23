/**
 * 用于编写api方法
 * api url 统一在urls.js中声明导出使用，与方法分开
 */
import { CLI_ENVS } from '@micro/helper/constant';

/**
 * 加载微应用
 *
 * @export
 * @return {*}
 */
export function loadMicroApps() {
  // return ajax({ url: API_MICRO_APPS }).then(transformData);

  const apps = [
    {
      id: 'wGPaOTn0UBRitQslQrv',
      title: '管理展板',
      micro: 'cli',
      name: 'demo',
      entry: '/micro/cli/demo.html',
    },
    {
      id: 'aa413989-2743-4fe5-87e1-8c822275038c',
      title: '子系统',
      micro: 'function',
      name: 'function',
      entry: '/micro/function/index.html',
    },
    {
      id: 'c0eece32-ddc0-4a54-b896-29d5059738a2',
      title: '资源表',
      micro: 'table',
      name: 'table',
      entry: '/micro/table/index.html',
    },
    {
      id: 'fce20676-9807-402d-b528-243d65f3b87d',
      title: '菜单',
      micro: 'menu',
      name: 'menu',
      entry: '/micro/menu/index.html',
    },
  ];
  // 开发环境配置微应用对应的服务地址
  apps.forEach((app) => {
    // 微服务链接变量
    const serviceVar =
      CLI_ENVS.VUE_APP_MICRO_CONFIG_PREFIX_SERVICE_VAR + app.micro.toLocaleUpperCase();
    // 微服务地址
    const url = CLI_ENVS[serviceVar] ?? '';
    app.entry = url + app.entry;
  });
  return Promise.resolve({ rows: apps });
}
