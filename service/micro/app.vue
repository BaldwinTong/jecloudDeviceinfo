<template>
  <!-- 系统基础配置 -->
  <a-config-provider :locale="locale"><slot></slot></a-config-provider>
</template>
<script>
  import { defineComponent } from 'vue';
  import { watchI18n } from '@common/locales';
  import { ConfigProvider } from 'ant-design-vue';
  import { setSystemInfo } from '@jecloud/utils';
  import { useMicroStore } from '@common/store/micro-store';
  export default defineComponent({
    components: {
      AConfigProvider: ConfigProvider, // ant系统配置
    },
    setup() {
      const microStore = useMicroStore();
      const { locale } = watchI18n();
      // 设置登录后的系统信息
      microStore.on('admin-login-success', (options) => {
        setSystemInfo(options);
      });
      return { locale };
    },
  });
</script>
