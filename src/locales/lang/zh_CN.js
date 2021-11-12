// 加载antd国际化文件
import antdLocale from 'ant-design-vue/es/locale/zh_CN';
// 读取国际文件
import zh_CN from './zh_CN/index';
const locales = {
  ...zh_CN,
  antdLocale, // antd
};
export default locales;
