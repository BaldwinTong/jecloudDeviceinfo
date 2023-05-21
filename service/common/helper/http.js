import {
  transformAjaxData,
  getAjaxInstance,
  toNumber,
  getSystemConfig,
  toParamsEncrypt,
  JE_CORE_AJAXTIMEOUT,
} from '@jecloud/utils';
import { HTTP_BASE_URL } from './constant';
import { useGlobalStore } from '@common/store/global-store';
import { useMicroStore } from '@common/store/micro-store';
import { logout } from './system';
/**
 * ajax 实例
 */
let ajaxInstance;
/**
 * 系统ajax设置
 */
export function setupAjax() {
  ajaxInstance = getAjaxInstance();
  setAjaxBaseURL();
  onBeforeRequest();
  onResponse();
  onResponseCatch();
}
/**
 * 设置基础配置
 * @param {Object} config
 */
export function setAjaxDefaultConfig() {
  // 系统默认超时时间
  const timeout = toNumber(getSystemConfig(JE_CORE_AJAXTIMEOUT, 0)) * 1000;
  ajaxInstance.setDefaultConfig({
    timeout,
  });
}
/**
 * 设置基础请求链接
 * @param {*} param0
 */
export function setAjaxBaseURL(baseURL) {
  const microStore = useMicroStore();
  const devBaseUrl = microStore.options.proxyPrefix ?? HTTP_BASE_URL;
  ajaxInstance.setBaseURL(baseURL || devBaseUrl);
}
export function getAjaxBaseURL() {
  return ajaxInstance.getBaseURL();
}
/**
 * 请求拦截器
 */
function onBeforeRequest() {
  const store = useGlobalStore();
  ajaxInstance.onBeforeRequest(({ config }) => {
    // 1. 添加token，默认所有请求自动携带token
    if (config.token !== false) {
      // 读取本地token
      const token = store.getToken();
      if (token) {
        // 追加请求头token
        config.headers[store.tokenKey] = token;
      } else {
        // 没有token，退出登录
        return Promise.reject({ status: 401 });
      }
    }
    // 2. 请求参数安全加密
    const encryptInfo = toParamsEncrypt(config.params);
    if (encryptInfo) {
      Object.assign(config.headers, encryptInfo);
    }
  });
}
/**
 * 响应拦截器
 */
function onResponse() {
  ajaxInstance.onResponse(({ response }) => {
    // 直接返回数据对象
    return response.data;
  });
}
/**
 * 错误拦截器
 */
function onResponseCatch() {
  ajaxInstance.onResponseCatch(({ error, config }) => {
    console.error('AJAX-ERROR', error, config);
    const { status } = error;
    // 用户失效，退出登录
    if ([401, 403].includes(status)) {
      logout();
    }
  });
}

/**
 * 格式化数据
 *
 * @export
 * @return {*}
 */
export const transformData = transformAjaxData;
