<!-- 主页面布局 -->
<template>
  <div class="je-layout-main">
    <Header v-if="!isMicro()"></Header>
    <!-- 路由 -->
    <router-view class="je-layout-main-router">
      <template #default="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </template>
    </router-view>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';
  import Header from './header.vue';
  import { isMicro } from '@micro/helper';
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
  .je-layout-main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .je-layout-main-router {
    height: 100%;
    overflow: hidden;
  }
</style>
