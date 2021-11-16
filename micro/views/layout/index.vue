<!-- 主页面布局 -->
<template>
  <a-layout>
    <Header></Header>
    <!-- 路由 -->
    <router-view class="router-content" />
  </a-layout>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';
  import Header from './header.vue';
  export default defineComponent({
    components: {
      ALayout: Layout,
      Header,
    },
    setup(props) {},
  });
</script>
<style lang="less">
  .router-content {
    height: 100%;
    padding: 10px;
    overflow: auto;
  }
</style>
