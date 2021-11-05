import { buildLocales } from '../utils';

// 加载antd国际化文件
import antdLocale from 'ant-design-vue/es/locale/en_US';

// 读取国际文件
// const files = require.context('./en_US', true, /\.js/);

const files = import.meta.globEager('./en_US/**/*.js');
const locales = Object.assign(buildLocales(files), {
  antdLocale, // antd
});

export default locales;
