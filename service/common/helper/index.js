import { setupJE } from './je';
import { setupAjax } from './http';
import { setupTheme } from './theme';
import { setupStore } from '../store';
import { setupIi8n } from '../locales';
import { isMicro } from '@micro/helper';
import { initSystemConfig, initStyles } from '@jecloud/utils';

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
  // GlobalStyles
  if (!isMicro()) {
    // 微应用不处理，防止重复加载
    await initStyles();
  }
  // I18n
  await setupIi8n(vue);
  // theme
  setupTheme(vue);
}
