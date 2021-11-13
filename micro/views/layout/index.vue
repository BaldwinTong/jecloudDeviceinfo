<!-- 主页面布局 -->
<template>
  <a-layout>
    <Header></Header>
    <!-- 滚动条 -->
    <je-scroller id="content-scroller" ref="scroller">
      <!-- 路由 -->
      <router-view />
      <!-- 返回顶部 -->
      <a-back-top :target="getScrollerTarget" />
    </je-scroller>
  </a-layout>
</template>
<script>
  import { defineComponent, ref, provide } from 'vue';
  import { Layout, BackTop } from 'ant-design-vue';
  import { Scroller } from '@jecloud/ui';
  import Header from './header.vue';
  export default defineComponent({
    components: {
      ALayout: Layout,
      ABackTop: BackTop,
      JeScroller: Scroller,
      Header,
    },
    setup(props) {
      const scroller = ref();
      const getScrollerTarget = function () {
        return scroller.value.getScrollWrap().value;
      };
      // 注册scroll组件，供子组件访问
      provide('content-scroller', scroller);
      return { scroller, getScrollerTarget };
    },
  });
</script>
