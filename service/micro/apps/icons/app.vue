<template>
  <App>
    <Icons />
  </App>
</template>
<script>
  import { defineComponent } from 'vue';
  import App from '@micro/app.vue';
  import Icons from '@common/views/icons/index.vue';
  export default defineComponent({
    components: {
      App, // 系统配置
      Icons,
    },
  });
</script>
