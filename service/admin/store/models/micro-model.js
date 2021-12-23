import { cloneDeep } from 'lodash-es';
import { useAdminStore } from '../admin-store';
import { useMenuStore } from '../menu-store';
/**
 * 微应用模型
 *
 * @export
 * @class MicroModel
 */
export default class MicroModel {
  constructor(config) {
    this.name = config.name;
    this.entry = config.entry;
    this.props = config.props ?? {};
    this._bindMenu(config.id);
  }

  instance = null; // 微应用实例

  get rendered() {
    return this.instance !== null;
  }

  get container() {
    return `#${this.containerId}`;
  }
  get containerId() {
    return `micro-container-${this.name}`;
  }
  get path() {
    const model = this.menu?.topMenu?.id ?? 'micro';
    const id = this.menu?.id;
    return `/main/${model}/${id}`;
  }
  get activeRule() {
    return `#${this.path}`;
  }
  /**
   * 绑定菜单
   *
   * @param {*} menuId
   * @memberof MicroModel
   */
  _bindMenu(menuId) {
    const menuStore = useMenuStore();
    const menu = menuStore.getMenu(menuId);
    if (menu) {
      this.menu = menu;
      this.menu.micro = true;
    }
  }
  toRaw() {
    const adminStore = useAdminStore();
    const props = {
      props: cloneDeep(this.props),
      store: adminStore,
    };
    return {
      name: this.name,
      container: this.container,
      // activeRule: this.activeRule,
      entry: this.entry,
      props,
    };
  }
}
