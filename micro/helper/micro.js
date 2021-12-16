import { useMicroStore } from '@micro/store/micro-store';
/**
 * 动态加载微应用资源
 *
 * @export
 * @return {*}
 */
export async function setupMicroAssets() {
  // 微应用的通讯store
  const microStore = useMicroStore();
  if (microStore) return;

  // 引入全局样式
  import('@micro/assets/styles/index.less');
}
