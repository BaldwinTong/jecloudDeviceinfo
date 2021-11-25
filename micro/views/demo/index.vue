<template>
  <div class="home">
    <a-typography-title>{{ $t('demo.welcome', [name]) }}</a-typography-title>
    <je-alert
      :message="$t('demo.success')"
      type="success"
      show-icon
      style="width: 600px"
    ></je-alert>
  </div>
</template>

<script>
  import { computed } from 'vue';
  import { Alert } from '@jecloud/ui';
  import { useJE } from '../../hooks/use-je';
  import { Typography } from 'ant-design-vue';
  export default {
    name: 'Demo',
    components: {
      JeAlert: Alert,
      ATypographyTitle: Typography.Title,
    },
    setup(props) {
      const { USER } = useJE();
      const name = computed(() => {
        return USER?.username;
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
