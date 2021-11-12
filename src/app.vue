<template>
  <a-config-provider :locale="locale">
    <Layout class="app-layout" />
  </a-config-provider>
</template>
<script>
  import { defineComponent, ref, watch, provide } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ConfigProvider } from 'ant-design-vue';
  import { getAntdLocale } from '@/locales';
  import Layout from 'micro/views/layout/index.vue';
  export default defineComponent({
    components: {
      AConfigProvider: ConfigProvider, // ant系统配置
      Layout, // 布局组件
    },
    setup(props) {
      // 国际化处理
      let locale = ref();
      locale.value = getAntdLocale();
      const i18n = useI18n();
      watch(
        () => i18n.locale.value,
        () => {
          locale.value = getAntdLocale();
        },
      );
      return { locale };
    },
  });
</script>

<style lang="less">
  @import './assets/styles/base.less';
  #app,
  .app-layout {
    height: 100%;
  }
</style>
