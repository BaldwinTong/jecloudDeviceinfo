<template>
  <App>
    <Layout />
    <!-- 如果不使用系统顶栏，请将Layout 换成 RouterView -->
    <!-- <router-view></router-view> -->
  </App>
</template>
<script>
  import { defineComponent } from 'vue';
  import App from '@micro/app.vue';
  import Layout from '@micro/views/layout/index.vue';
  export default defineComponent({
    components: {
      App, // 系统配置
      Layout, // 布局组件
    },
  });
</script>
