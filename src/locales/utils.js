import { set } from '@jecloud/utils';
/**
 * 解析国际化文件
 *
 * @export
 * @param {*} files
 * @return {*}
 */
export function buildLocales(files) {
  const locales = {};
  files.keys().forEach((key) => {
    // 将文件路径改为属性路径：./lang/en_US/index.js => lang.en_US.index
    const keyPath = key.replace('./', '').replace('.js', '').replaceAll('/', '.');
    set(locales, keyPath, files(key).default);
  });
  return locales;
}
