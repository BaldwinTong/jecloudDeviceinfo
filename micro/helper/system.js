import { mixinJE } from './je';
import { getCurrentUser, getSystemConfig } from '../api';

/**
 * 初始化系统信息
 *
 * @export
 * @return {Promise}
 */
export function initSystemInfo() {
  return Promise.all([getCurrentUser(), getSystemConfig()]).then((data) => {
    mixinJE({
      USER: data[0],
      systemConfig: data[1],
    });
  });
}
