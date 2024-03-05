<template>
  <!-- 系统基础配置 -->
  <a-config-provider :locale="locale">
    <template v-if="isDisabled">
      <div style="text-align: center; font-size: 40px; font-weight: bold; padding-top: 10%">
        {{ message }}
      </div>
    </template>
    <template v-else><slot></slot></template>
  </a-config-provider>
</template>
<script>
  import { defineComponent } from 'vue';
  import { watchI18n } from '@common/locales';
  import { ConfigProvider } from 'ant-design-vue';
  import { setSystemInfo } from '@jecloud/utils';
  import { useMicroStore } from '@common/store/micro-store';
  import { CLI_ENVS } from '@common/helper/constant';
  import { isMicro } from './helper';
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
      // 插件禁止单独访问
      const message = '微应用插件禁止单独访问！';
      // 禁止访问条件： 插件 && 生产环境 && 单独访问（非微应用环境）
      const isDisabled = CLI_ENVS.VUE_APP_PLUGIN && CLI_ENVS.NODE_ENV == 'production' && !isMicro();

      return { locale, isDisabled, message };
    },
  });
</script>
