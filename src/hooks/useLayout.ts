import { inject } from 'vue';
/**
 * 布局处理
 *
 * @export
 * @return {*}
 */
export function useLayout() {
  const scroller = inject('content-scroller') as any;
  const getScroller = function () {
    return scroller;
  };
  // 获得滚动条容器
  const getScrollWrap = function () {
    return scroller.value.getScrollWrap().value;
  };
  // 获得容器高度
  const contentHeight = scroller.value.$el.clientHeight;

  return { getScroller, getScrollWrap, contentHeight };
}
