import { ref } from 'vue';
/**
 * 布局处理
 *
 * @export
 * @return {*}
 */
export function useLayout() {
  const scroller = ref();
  const getScroller = function () {
    return scroller;
  };
  const getScrollerTarget = function () {
    return scroller.value.getScrollWrap().value;
  };
  // 获得滚动条容器
  const getScrollWrap = function () {
    return scroller.value.getScrollWrap().value;
  };

  return { getScrollerTarget, getScroller, getScrollWrap, scroller };
}
