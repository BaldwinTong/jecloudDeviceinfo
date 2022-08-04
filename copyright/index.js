import { timer, random } from '@jecloud/utils';
import './index.css';
/**
 * 微应用控制
 * @param {*} options
 */
function setupCopyright() {
  const win = window;
  const doc = win[['d', 'ocume', 'nt'].join('')];
  const body = doc[['b', 'od', 'y'].join('')];
  const appId = ['ap', 'p'].join('');
  const microMark = ['_', '_MIC', 'RO_A', 'PP', '_', 'ENVIRO', 'NMENT_', '_'].join('');
  // 微应用环境
  const isMicro = !!win[microMark];
  if (!isMicro) {
    const decode = win[['deco', 'deURICom', 'ponent'].join('')];
    // 添加提示
    const dom = doc[['cre', 'ateE', 'lem', 'ent'].join('')]('div');
    dom.setAttribute(['cl', 'as', 's'].join(''), ['u', 'n-pe', 'rm-s', 'tyle'].join(''));
    dom.innerHTML = decode(
      // 平台级微应用不允许单独访问！
      [
        '%E5%B9%B3%E5%8F%B0%E7%BA%A7%E5%BE%AE%',
        'E5%BA%94%E7%94%A8%E4%B8%8D%E5%85%81%E8%AE%B8%',
        'E5%8D%95%E7%8B%AC%E8%AE%BF%E9%97%AE%EF%BC%81',
      ].join(''),
    );
    body.appendChild(dom);
    // 定时清空appDom
    timer(() => {
      const appDom = doc[['ge', 'tE', 'lem', 'entB', 'yId'].join('')](appId);
      if (appDom) {
        appDom.parentNode.removeChild(appDom);
      }
    }, random(2, 10) * 1000).exec();
  }
}

setupCopyright();
