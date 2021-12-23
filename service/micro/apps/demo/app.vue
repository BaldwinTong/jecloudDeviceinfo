<template>
  <App>
    <Demo />
  </App>
</template>
<script>
  import { defineComponent } from 'vue';
  import App from '@micro/app.vue';
  import Demo from '@micro/views/demo/index.vue';
  export default defineComponent({
    components: {
      App, // 系统配置
      Demo,
    },
  });
</script>
