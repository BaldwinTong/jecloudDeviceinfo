/**
 * 生命周期函数
 * 可以根据业务自行修改
 */
import ui from '@jecloud/ui';
import func from '@jecloud/func';
import { setupRouter } from '@micro/router';
export default {
  /**
   * vue 初始化
   * @param {*} vue
   */
  async onVueInit(vue) {
    // 注册组件
    vue.use(ui).use(func);
  },
  /**
   * vue 渲染
   * @param {*} vue
   */
  async onVueBeforeMount(vue) {
    // Router
    setupRouter(vue);
  },
};
