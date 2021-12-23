import { setupJE } from './je';
import { setupTheme } from './theme';
import { setupStore } from '../store';
import { setupIi8n } from '../locales';

export async function setupCommon(vue) {
  import('@common/assets/styles/index.less');
  // JE
  setupJE(vue);
  // Store
  setupStore(vue);
  // theme
  setupTheme(vue);
  // I18n
  await setupIi8n(vue);
}
