<template>
  <!-- 系统基础配置 -->
  <a-config-provider :locale="locale"><slot></slot></a-config-provider>
</template>
<script>
  import { defineComponent, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ConfigProvider } from 'ant-design-vue';
  import { useLocale } from '@micro/hooks/use-i18n';
  export default defineComponent({
    components: {
      AConfigProvider: ConfigProvider, // ant系统配置
    },
    setup(props) {
      // 国际化处理
      const { getAntdLocale } = useLocale();
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
