import { CLI_ENVS } from '@common/helper/constant';
import { useJE } from '@common/helper/je';
import micro from '@micro';
import ui, { ConfigProvider } from '@jecloud/ui';
import func from '@jecloud/func';
import plugin from '@jecloud/plugin';
import App from './app.vue';

micro.setup({
  app: App,
  callback: (vue) => {
    // vue 实例，可以进行相关业务操作
    vue.use(ui).use(func).use(plugin);
    // 配置UI库，如果不需要功能，可以不引入
    ConfigProvider.setup({ publicPath: CLI_ENVS.PUBLIC_PATH, func });
    // 功能组件绑定JE，用于事件操作
    func.ConfigProvider.setup({ JE: useJE() });
  },
});

// 导出微应用钩子函数
export const { bootstrap, mount, unmount } = micro.useHooks();
