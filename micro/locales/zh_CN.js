// 加载antd国际化文件
import antdLocale from 'ant-design-vue/es/locale/zh_CN';
// 读取国际文件
import zh_CN from './lang/zh_CN';
// 加载业务语言
import zh_CN4bus from '@/locales/lang/zh_CN';

const locales = {
  ...zh_CN,
  ...zh_CN4bus,
  antdLocale, // antd
};
export default locales;
