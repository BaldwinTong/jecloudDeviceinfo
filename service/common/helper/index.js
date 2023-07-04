import { setupJE } from './je';
import { setupAjax } from './http';
import { setupTheme } from './theme';
import { setupStore } from '../store';
import { setupIi8n } from '../locales';
import { isMicro } from '@micro/helper';
import { initSystemConfig } from '@jecloud/utils';

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
  // I18n
  await setupIi8n(vue);
  // SystemConfig
  await initSystemConfig();
  // theme
  setupTheme(vue);
}
