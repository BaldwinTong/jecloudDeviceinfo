import { initAxios, transformAjaxData, debounce } from '@jecloud/utils';
import { Modal } from '@jecloud/ui';
import { HTTP_BASE_URL } from './constant';
import { useGlobalStore } from '@common/store/global-store';
import { useMicroStore } from '@common/store/micro-store';

/**
 * 展示错误信息
 */
const showErrorMessage = debounce(({ code, message } = {}) => {
  code && Modal.message(`${message}【${code}】`, Modal.status.error);
}, 100);

/**
 * 注册axios配置
 *
 * @export
 */
export function setupAxios() {
  const globalStore = useGlobalStore();
  const microStore = useMicroStore();
  const axiosConfig = {
    // 请求超时时间
    timeout: 30 * 1000,
    // 基础接口地址
    baseURL: microStore.options.proxyPrefix ?? HTTP_BASE_URL,
    // 如果是form-data格式
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 消息提示类型
      errorMessageMode: 'message',
    },
    /**
     * 请求前拦截器
     * @param {*} config
     */
    requestInterceptors(config) {
      const token = globalStore.getToken();
      // 添加请求头
      if (token) {
        config.headers = Object.assign(config.headers ?? {}, { [globalStore.tokenKey]: token });
      }
    },
    // transform: {
    //   requestCatchHook(error) {
    //     showErrorMessage(error.errorInfo);
    //   },
    // },
  };
  initAxios(axiosConfig);
}

/**
 * 格式化数据
 *
 * @export
 * @return {*}
 */
export const transformData = transformAjaxData;
