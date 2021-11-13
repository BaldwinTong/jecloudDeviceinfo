// 加载antd国际化文件
import antdLocale from 'ant-design-vue/es/locale/en_US';
// 读取国际文件
import en_US from './lange/en_US';
// 加载业务语言
import en_US4bus from '@/locales/en_US';
const locales = {
  ...en_US,
  ...en_US4bus,
  antdLocale, // antd
};

export default locales;
