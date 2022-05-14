/**
 * 是否微应用
 *
 * @export
 * @return {*}
 */
export function isMicro() {
  return !!window.__MICRO_APP_ENVIRONMENT__;
}
