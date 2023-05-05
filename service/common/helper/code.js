import { mixinJE, useJE } from './je';
import { ajax, transformAjaxData, encode, execScript, createStyleSheet } from '@jecloud/utils';
import lessDefault from 'less/lib/less-browser';
const less = lessDefault(window, {});
const jsMap = new Map();
/**
 * 初始化全局脚本
 * @returns
 */
export function initCodes() {
  const JE = useJE();
  // 注入JE全局函数
  mixinJE({
    /**
     * 执行全局脚本库
     * @param {String} code 方法名
     * @param {Object} options 参数
     * @returns
     */
    callCustomFn(code, options) {
      let fnCode = jsMap.get(code);
      if (fnCode) {
        try {
          return execScript(fnCode, { JE, EventOptions: options || {} });
        } catch (error) {
          console.error(`js全局脚本库：【${code}】出错了！`);
          console.error(error);
        }
      }
    },
    /**
     * 更新全局脚本
     * @private
     * @param {*} code 方法名
     * @param {*} codes 代码
     */
    updateCustomFn(code, codes) {
      if (code && codes) {
        jsMap.set(code, codes);
      }
    },
    /**
     * 解析样式
     * @param {*} code 样式名
     * @param {*} codes 代码
     * @returns
     */
    parseCustomStyle(code, codes) {
      return less.render(`.${code}{${codes}}`).then(({ css }) => css);
    },
    /**
     * 注册样式
     * @param {*} code 样式名
     * @param {*} codes 代码
     * @returns
     */
    registCustomStyle(code, codes) {
      return JE.parseCustomStyle(code, codes).then((cssCode) => {
        createStyleSheet(cssCode, 'je_coustom_' + code);
      });
    },
  });
  // 加载脚本库
  return Promise.all([initJsCodeApi(), initCssCodeApi()]).then(([jsCodes, cssCodes]) => {
    // 缓存js脚本库
    jsCodes.rows.forEach((item) => {
      jsMap.set(item.QJJBK_FFM, item.QJJBK_JBDM);
    });
    // 解析css样式库
    const csss = [];
    cssCodes.rows.forEach((item) => {
      csss.push(`.${item.QJCSS_YSM}{${item.QJCSS_YSDM}}`);
    });
    // 写入样式
    csss.length > 0 &&
      less.render(csss.join('')).then(({ css }) => {
        createStyleSheet(css);
      });
  });
}
/**
 * 加载全局样式库
 * @returns
 */
function initCssCodeApi() {
  return ajax({
    url: '/je/common/load',
    headers: { pd: 'meta' },
    params: {
      tableCode: 'JE_CORE_QJCSS',
      funcCode: 'JE_CORE_QJCSS',
      j_query: encode([
        { code: 'QJCSS_QY_CODE', type: '=', value: '1' },
        { code: 'QJCSS_ZYFW_CODE', type: 'in', value: ['PC', 'ALL'] },
      ]),
      limit: -1,
    },
  }).then(transformAjaxData);
}
/**
 * 加载全局脚本库
 * @returns
 */
function initJsCodeApi() {
  return ajax({
    url: '/je/common/load',
    headers: { pd: 'meta' },
    params: {
      tableCode: 'JE_CORE_QJJBK',
      funcCode: 'JE_CORE_QJJBK',
      j_query: encode([
        { code: 'QJJBK_QY_CODE', type: '=', value: '1' },
        { code: 'QJJBK_ZYFW_CODE', type: 'in', value: ['PC', 'ALL'] },
      ]),
      limit: -1,
    },
  }).then(transformAjaxData);
}
