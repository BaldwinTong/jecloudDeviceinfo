import { createI18n } from 'vue-i18n';
import { GlobalSettingsEnum } from '../helper/constant';
import { SUPPORT_LOCALES } from '@micro/locales';
import { mixinJE } from '@micro/helper/je';

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
  mixinJE({ $i18n: i18n });
}

// 为什么要编写此函数？
// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const t = (key) => key;

/**
 * 获取国际化对象
 *
 * @export
 * @example
 * useI18n().t()
 * @return {*}
 */
export function useI18n() {
  if (!i18n) {
    return { t };
  }
  const { ...methods } = i18n.global;
  return {
    ...methods,
  };
}

/**
 * 使用多语言工具
 *
 * @export
 * @return {*}
 */
export function useLocale() {
  return {
    getLocales,
    getLocale,
    changeLocale,
    getAntdLocale,
    loadLocaleMessages,
  };
}
/**
 * 切换多语言
 *
 * @export
 * @param {string} locale
 */
async function changeLocale(locale) {
  // 加载文件
  await loadLocaleMessages(locale);
  // 设置语言
  i18n.global.locale = locale;
  // 设置缓存
  localStorage.setItem(GlobalSettingsEnum.GLOBAL_SETTINGS_LOCALE, locale);
  // 设置页面
  document.querySelector('html')?.setAttribute('lang', locale);
  return i18n;
}

/**
 * 异步加载语言文件
 *
 * @param {string} locale
 * @return {*}
 */
async function loadLocaleMessages(locale) {
  const messages = await import(`../locales/lang/${locale}.js`);
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
function getAntdLocale() {
  return i18n.global.getLocaleMessage(getLocale())?.antdLocale ?? {};
}
/**
 * 获得当前激活语言
 *
 * @export
 * @return {*}
 */
function getLocale() {
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
/**
 * 获取支持的语言列表
 *
 * @export
 * @return {*}
 */
function getLocales() {
  return SUPPORT_LOCALES;
}
