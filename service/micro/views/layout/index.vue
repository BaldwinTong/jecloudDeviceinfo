<!-- 主页面布局 -->
<template>
  <a-layout class="je-layout-default">
    <Header v-if="!isMicro()"></Header>
    <!-- 路由 -->
    <router-view class="router-content" />
  </a-layout>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';
  import Header from './header.vue';
  import { isMicro } from '@micro';
  export default defineComponent({
    components: {
      ALayout: Layout,
      Header,
    },
    setup(props) {
      return { isMicro };
    },
  });
</script>
<style scoped>
  .je-layout-default {
    height: 100%;
  }
  .router-content {
    height: 100%;
    overflow: hidden;
  }
</style>
