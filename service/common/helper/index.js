import { setupJE } from './je';
import { setupTheme } from './theme';
import { setupStore } from '../store';
import { setupIi8n } from '../locales';
import { CLI_ENVS } from './constant';

export async function setupCommon(vue) {
  import('@common/assets/styles/index.less');
  // 生产环境，不加载字体，样式，由静态资源处理
  if (CLI_ENVS.NODE_ENV == 'development') {
    import('@jecloud/ui/src/assets/fonts/index.css');
    import('@jecloud/ui/src/assets/styles/antd.less');
  }
  // Store
  setupStore(vue);
  // JE
  setupJE(vue);
  // theme
  setupTheme(vue);
  // I18n
  await setupIi8n(vue);
}
