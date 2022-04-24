/**
 * 是否微应用
 *
 * @export
 * @return {*}
 */
export function isMicro() {
  return !!window.__POWERED_BY_QIANKUN__;
}
