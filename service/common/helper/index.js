import { setupJE, useJE } from './je';
import { setupAjax } from './http';
import { setupTheme } from './theme';
import { setupStore } from '../store';
import { setupIi8n } from '../locales';
import { isMicro } from '@micro/helper';
import { initSystemConfig, initStyles } from '@jecloud/utils';
import { useGlobalStore } from '../store/global-store';

export async function setupCommon(vue) {
  // Style
  if (!isMicro()) {
    await import('@common/assets/externals');
  }
  // Store
  setupStore(vue);
  // Ajax
  setupAjax(vue);
  // JE
  setupJE(vue);
  // SystemConfig
  await initSystemConfig();
  // 获得globalStore
  const globalStore = useGlobalStore();
  // GlobalStyles
  if (!isMicro()) {
    // 微应用不处理，防止重复加载
    const { icons } = await initStyles();
    globalStore.globalIcons = icons;
  } else {
    // 微应用字体图标组件注入全局图标库数据
    const ui = useJE().useUi();
    ui?.setGlobalIcons?.(globalStore.globalIcons);
  }
  // I18n
  await setupIi8n(vue);
  // theme
  setupTheme(vue);
}
