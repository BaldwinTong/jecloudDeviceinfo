<!-- 主页面布局 -->
<template>
  <div class="je-layout-main">
    <Header v-if="showHeader"></Header>
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
  import { defineComponent, computed } from 'vue';
  import { Layout } from 'ant-design-vue';
  import Header from './header.vue';
  import { isMicro } from '@micro/helper';
  import { useGlobalStore } from '@common/store/global-store';
  import { useRoute } from 'vue-router';
  export default defineComponent({
    components: {
      ALayout: Layout,
      Header,
    },
    setup(props) {
      const globalStore = useGlobalStore();
      const route = useRoute();
      const showHeader = computed(() => {
        return !isMicro() && globalStore.token && route.name !== 'Login';
      });
      return { showHeader };
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
