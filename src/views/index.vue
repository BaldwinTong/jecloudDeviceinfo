<template>
  <div class="home">
    <a-typography-title>欢迎：{{ name }}，请开始你的表演！</a-typography-title>
    <je-alert message="登录成功！" type="success" show-icon style="width: 600px"></je-alert>
  </div>
</template>

<script>
  import { computed } from 'vue';
  import { Alert } from '@jecloud/ui';
  import { Typography } from 'ant-design-vue';
  export default {
    name: 'Home',
    components: {
      JeAlert: Alert,
      ATypographyTitle: Typography.Title,
    },
    setup(props) {
      const name = computed(() => {
        return JE.USER?.username;
      });
      return { name };
    },
  };
</script>
<style scoped>
  .home {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
