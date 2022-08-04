import { timer, random } from '@jecloud/utils';
import './index.css';
/**
 * 微应用控制
 * @param {*} options
 */
function setupCopyright() {
  // 微应用环境
  const isMicro = !!window[['_', '_MIC', 'RO_A', 'PP', '_', 'ENVIRO', 'NMENT_', '_'].join('')];
  if (!isMicro) {
    const decode = window[['deco', 'deURICom', 'ponent'].join('')];
    // 添加提示
    const dom = document.createElement('div');
    dom.setAttribute(['cl', 'as', 's'].join(''), ['u', 'n-pe', 'rm-s', 'tyle'].join(''));
    dom.innerHTML = decode(
      // 平台级微应用不允许单独访问！
      [
        '%E5%B9%B3%E5%8F%B0%E7%BA%A7%E5%BE%AE%',
        'E5%BA%94%E7%94%A8%E4%B8%8D%E5%85%81%E8%AE%B8%',
        'E5%8D%95%E7%8B%AC%E8%AE%BF%E9%97%AE%EF%BC%81',
      ].join(''),
    );
    document.body.appendChild(dom);
    // 定时清空appDom
    timer(() => {
      const appDom = document.getElementById('app');
      if (appDom) {
        appDom.parentNode.removeChild(appDom);
      }
    }, random(2, 10) * 1000).exec();
  }
}

setupCopyright();
