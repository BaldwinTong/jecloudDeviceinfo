<template>
  <App>
    <Layout />
  </App>
</template>
<script>
  import { defineComponent } from 'vue';
  import App from '@micro/app.vue';
  import Layout from '@micro/views/layout/index-body.vue';
  export default defineComponent({
    components: {
      App, // 系统配置
      Layout, // 布局组件
    },
  });
</script>
