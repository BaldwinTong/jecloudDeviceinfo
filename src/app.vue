<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script>
  import { defineComponent, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ConfigProvider } from 'ant-design-vue';
  import { getAntdLocale } from '@/locales';
  export default defineComponent({
    components: { AConfigProvider: ConfigProvider },
    setup(props) {
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
