<template>
  <App>
    <Func v-bind="$attrs" />
  </App>
</template>
<script>
  import { defineComponent } from 'vue';
  import App from '@micro/app.vue';
  import Func from '@micro/views/func/index.vue';
  export default defineComponent({
    components: {
      App, // 系统配置
      Func,
    },
  });
</script>
