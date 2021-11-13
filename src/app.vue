<template>
  <MicroApp />
</template>
<script>
  import { defineComponent } from 'vue';
  // 微应用主页面，无需修改
  import MicroApp from '@micro/app.vue';
  export default defineComponent({
    components: {
      MicroApp,
    },
  });
</script>
