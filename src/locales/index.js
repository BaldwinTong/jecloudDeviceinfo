import { createI18n } from 'vue-i18n';
import { GlobalSettingsEnum } from '../enums/global';
/**
 * 支持的语言
 */
export const SUPPORT_LOCALES = [
  { code: 'zh_CN', text: '简体中文' },
  { code: 'en_US', text: 'English' },
];

/**
 * 实例对象
 */
export let i18n;

/**
 * 安装i18n
 *
 * @export
 * @param {App} app
 */
export async function setupIi8n(app) {
  const localeI18n = getLocale();
  i18n = createI18n({});
  await changeLocale(localeI18n);
  app.use(i18n);
}

/**
 * 切换多语言
 *
 * @export
 * @param {string} locale
 */
export async function changeLocale(locale) {
  // 加载文件
  await loadLocaleMessages(locale);
  // 设置语言
  i18n.global.locale = locale;
  // 设置缓存
  localStorage.setItem(GlobalSettingsEnum.GLOBAL_SETTINGS_LOCALE, locale);
  // 设置页面
  document.querySelector('html')?.setAttribute('lang', locale);
}

/**
 * 异步加载语言文件
 *
 * @param {string} locale
 * @return {*}
 */
async function loadLocaleMessages(locale) {
  const messages = await import(`./lang/${locale}.js`);
  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);
  return messages;
}

/**
 * 获得antd语言包
 *
 * @export
 * @return {*}
 */
export function getAntdLocale() {
  return i18n.global.getLocaleMessage(getLocale())?.antdLocale ?? {};
}
/**
 * 获得当前激活语言
 *
 * @export
 * @return {*}
 */
export function getLocale() {
  const local = localStorage.getItem(GlobalSettingsEnum.GLOBAL_SETTINGS_LOCALE);
  if (
    local &&
    SUPPORT_LOCALES.find((item) => {
      return item.code === local;
    })
  ) {
    return local;
  }
  return SUPPORT_LOCALES[0].code;
}

// 为什么要编写此函数？
// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const t = (key) => key;
