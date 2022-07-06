import { createI18n } from 'vue-i18n';
import { mixinJE } from '../helper/je';
import { useGlobalStore } from '../store/global-store';
import { watch, ref } from 'vue';

let i18n;
export function useI18n() {
  return i18n;
}

/**
 * 监听国际化
 * @returns
 */
export function watchI18n() {
  const getAntdLocale = function () {
    return i18n.global.getLocaleMessage(i18n.global.locale)?.antdLocale ?? {};
  };
  // 国际化处理
  const locale = ref();
  watch(
    () => i18n.global.locale,
    () => {
      locale.value = getAntdLocale();
    },
    { immediate: true },
  );
  return { locale };
}

/**
 * 安装i18n
 *
 * @export
 * @param {App} app
 */
export async function setupIi8n(app) {
  const globalStore = useGlobalStore();
  const locale = globalStore.getInitLocale();
  i18n = createI18n({});
  await changeI18n(locale);
  app.use(i18n);
  mixinJE({ $i18n: i18n });
  watch(() => globalStore.locale, changeI18n);
}
/**
 * 切换语言
 *
 * @export
 * @param {*} lang
 */
export async function changeI18n(lang) {
  const globalStore = useGlobalStore();
  lang = lang ?? globalStore.locale;
  globalStore.setLocale(lang);
  const messages = await loadI18n(lang);
  i18n.global.setLocaleMessage(lang, messages);
  i18n.global.locale = lang;
}

/**
 * 加载语言文件
 *
 * @param {*} lang
 * @return {*}
 */
const loadI18n = async function (lang) {
  const messages = await import(/* @vite-ignore */ `./${lang}.js`);
  return messages.default;
};

// 为什么要编写此函数？
// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const t = (key) => key;
