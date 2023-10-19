import {
  transformAjaxData,
  getAjaxInstance,
  toNumber,
  getSystemConfig,
  toParamsEncrypt,
  JE_CORE_AJAXTIMEOUT,
} from '@jecloud/utils';
import { AJAX_BASE_URL } from './constant';
import { useGlobalStore } from '@common/store/global-store';
import { useMicroStore } from '@common/store/micro-store';
import { logout } from './system';
import { isMicro } from '@micro/helper';
/**
 * ajax 实例
 */
let ajaxInstance;
/**
 * 系统ajax设置
 */
export function setupAjax() {
  if (isMicro()) {
    // 微应用使用主应用的ajax实例
    return;
  }
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
  if (isMicro()) {
    // 微应用使用主应用的ajax实例
    return;
  }
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
function setAjaxBaseURL(baseURL) {
  const microStore = useMicroStore();
  const devBaseUrl = microStore.options.proxyPrefix || AJAX_BASE_URL;
  ajaxInstance.setBaseURL(baseURL || devBaseUrl);
}
/**
 * 请求拦截器
 */
function onBeforeRequest() {
  const store = useGlobalStore();
  ajaxInstance.onBeforeRequest(({ config, sync }) => {
    // 1. 添加token，默认所有请求自动携带token
    if (config.token !== false) {
      // 读取本地token
      const token = store.getToken();
      if (token) {
        // 追加请求头token
        config.headers[store.tokenKey] = token;
      } else {
        // 没有token，退出登录
        const error = {
          status: 401,
          config,
          message: '浏览器token缓存已失效，请重新登录，如需禁用校验，请设置请求配置项token:false',
        };
        if (sync) {
          ajaxInstance.fire('response-catch', { error, config });
          return false;
        } else {
          return Promise.reject(error);
        }
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
    console.error('AJAX-ERROR', { ...error, config });
    // 用户失效，退出登录
    if (error.status == 401) {
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
