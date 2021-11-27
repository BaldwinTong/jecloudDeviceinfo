import { initAxios } from '@jecloud/utils';
import { useConstant } from './use-constant';

const { BASE_URL } = useConstant();
/**
 * 个性化配置
 *
 * @type {Object}
 */
const axiosConfig = {
  // 请求超时时间
  timeout: 30 * 1000,
  // 基础接口地址
  baseURL: BASE_URL,
  // 如果是form-data格式
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 消息提示类型
    errorMessageMode: 'message',
  },
  // token无效时，处理
  tokenInvalid() {},
};

/**
 * 注册axios配置
 *
 * @export
 */
export function setupAxios() {
  initAxios(axiosConfig);
}
