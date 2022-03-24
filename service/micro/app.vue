<template>
  <!-- 系统基础配置 -->
  <a-config-provider :locale="locale"><slot></slot></a-config-provider>
</template>
<script>
  import { defineComponent, ref, watch } from 'vue';
  import { useI18n } from '@common/locales';
  import { ConfigProvider } from 'ant-design-vue';
  export default defineComponent({
    components: {
      AConfigProvider: ConfigProvider, // ant系统配置
    },
    setup(props) {
      const i18n = useI18n();
      const getAntdLocale = function () {
        return i18n.global.getLocaleMessage(i18n.locale)?.antdLocale ?? {};
      };
      // 国际化处理
      let locale = ref(getAntdLocale());
      watch(
        () => i18n.global.locale.value,
        () => {
          locale.value = getAntdLocale();
        },
      );
      return { locale };
    },
  });
</script>
