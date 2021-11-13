<template>
  <a-config-provider :locale="locale">
    <Layout class="app-layout" />
  </a-config-provider>
</template>
<script>
  import { defineComponent, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ConfigProvider } from 'ant-design-vue';
  import { useLocale } from './hooks/use-i18n';
  import Layout from './views/layout/index.vue';
  import { useJE } from './hooks/use-je';
  export default defineComponent({
    components: {
      AConfigProvider: ConfigProvider, // ant系统配置
      Layout, // 布局组件
    },
    setup(props) {
      // 国际化处理
      const { getAntdLocale } = useLocale();
      const je = useJE();

      let locale = ref(getAntdLocale());
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
  #app,
  .app-layout {
    height: 100%;
  }
</style>
