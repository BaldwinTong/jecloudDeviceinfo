<template>
  <div class="je-settings-theme-mode">
    <div v-if="title" class="title">{{ title }}</div>
    <div class="mode">
      <Switch v-model:checked="themeStore[mode]" @change="toggleThemeMode"></Switch>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Switch } from 'ant-design-vue';
  import { useThemeSetting } from './hooks';
  export default defineComponent({
    name: 'SettingsThemeMode',
    components: { Switch },
    props: {
      mode: {
        type: String,
        default: 'darkMode',
        validator(value) {
          return ['darkMode', 'grayMode', 'colorWeak'].includes(value);
        },
      },
      title: {
        type: String,
        default: '',
      },
    },
    emit: ['toggle-theme-mode'],
    setup(props, context) {
      const { themeStore, toggleThemeMode } = useThemeSetting({ props, context });
      return {
        themeStore,
        toggleThemeMode,
      };
    },
  });
</script>
<style lang="less" scoped>
  .je-settings-theme-mode {
    text-align: center;
    .title {
      padding: 20px 0;
    }
  }
</style>
