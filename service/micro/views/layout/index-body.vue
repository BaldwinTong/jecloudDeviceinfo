<!-- 主页面布局 -->
<template>
  <Home :show-header="false" class="body-layout" />
</template>
<script>
  import { defineComponent } from 'vue';
  import Home from './index.vue';
  export default defineComponent({
    components: {
      Home,
    },
    setup(props) {},
  });
</script>
<style scoped>
  .body-layout {
    height: 100%;
  }
</style>
