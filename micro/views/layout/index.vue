<!-- 主页面布局 -->
<template>
  <a-layout class="body-layout">
    <Header v-if="!isMicro"></Header>
    <!-- 路由 -->
    <router-view class="router-content" />
  </a-layout>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';
  import Header from './header.vue';
  import { useMicroStore } from '@micro/store/micro-store';
  export default defineComponent({
    components: {
      ALayout: Layout,
      Header,
    },
    setup(props) {
      const store = useMicroStore();
      return { isMicro: !!store };
    },
  });
</script>
<style scoped>
  .body-layout {
    height: 100%;
  }
  .router-content {
    height: 100%;
    padding: 10px;
    overflow: auto;
  }
</style>
