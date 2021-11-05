import { buildLocales } from '../utils';

// 加载antd国际化文件
import antdLocale from 'ant-design-vue/es/locale/zh_CN';

// 读取国际文件
// const files = require.context('./zh_CN', true, /\.js/);
const files = import.meta.globEager('./zh_CN/**/*.js');
const locales = Object.assign(buildLocales(files), {
  antdLocale, // antd
});
export default locales;
