import { initAxios } from '@jecloud/utils';
import { HTTP_BASE_URL } from './constant';

/**
 * 个性化配置
 *
 * @type {Object}
 */
const axiosConfig = {
  // 请求超时时间
  timeout: 30 * 1000,
  // 基础接口地址
  baseURL: HTTP_BASE_URL,
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

/**
 * 格式化数据
 *
 * @export
 * @return {*}
 */
export function useAxios() {
  const transformData = function (data) {
    // TODO: 数据兼容，后期去掉，后台返回数据格式，参考：mock/util.js
    const _data = {};
    if (data.obj) {
      // 正常返回
      _data.data = data.obj;
    } else if (!Object.prototype.hasOwnProperty.call(data, 'success')) {
      // 直接返回对象
      _data.data = data;
      _data.success = true;
      _data.code = 200;
      _data.message = 'ok';
      data = {}; // 清空原始数据
    }
    ['obj', 'rows', 'totalCount'].forEach((key) => {
      delete data[key];
    });
    Object.assign(data, _data);

    // 返回业务数据
    if (data.success) {
      return data.data;
    } else {
      return Promise.reject(data);
    }
  };
  return {
    transformData,
  };
}
