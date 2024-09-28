/**
 * 用于编写api方法
 * api url 统一在urls.js中声明导出使用，与方法分开
 */
import { ajax } from '@jecloud/utils';
import { transformData } from '@common/helper/http';
import { API_DEVICE_INFO,API_DEVICE_GETLIVE } from './urls';
export function getDeviceInfo(params) {
  return ajax({ url: API_DEVICE_INFO, params:params, method: 'POST',headers: { 'Content-Type': 'application/json;charset=UTF-8','pd':'work'} }).then(
    transformData,
  );
}
export function getLive(params) {
  return ajax({ url: API_DEVICE_GETLIVE, params:params, method: 'get',headers: {'pd':'work'} }).then(
    transformData,
  );
}
