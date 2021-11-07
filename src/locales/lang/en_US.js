// 加载antd国际化文件
import antdLocale from 'ant-design-vue/es/locale/en_US';
// 读取国际文件
import en_US from './en_US/index';

const locales = {
  ...en_US,
  antdLocale, // antd
};

export default locales;
