/* 常用结果数据 */

const BASE_URL = '/jeapi';

/**
 * 创建mock数据
 * @param {String} url
 * @param {Function} response({ headers, query}):result
 * @param {Object} response.headers 请求头
 * @param {Object} response.query   请求参数，只有GET请求时有效
 * @param {Object} response.result  返回结果
 *
 * @returns options
 */
export function createMock(url, response) {
  url = BASE_URL + url;
  return {
    url,
    timeout: 100,
    response,
  };
}

/**
 *  普通数据
 * @param {*} obj 结果数据
 * @param {*} param 其他配置
 * @returns Object
 */
export function resultInfo(obj, { message = 'ok', success = true, code = 1000 } = {}) {
  return {
    code,
    obj,
    message,
    success,
  };
}

/**
 *  列表数据
 * @param {*} rows 结果数据
 * @param {*} param 其他配置
 * @returns Object
 */
export function resultList(rows, { message = 'ok', success = true, code = 1000 } = {}) {
  return {
    code,
    rows,
    totalCount: rows.length * 2,
    message,
    success,
  };
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }) {
  return headers?.authorization;
}
