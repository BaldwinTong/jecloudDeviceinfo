<template>
  <div class="je-settings-theme-mode">
    <div>{{ title }}</div>
    <div class="mode">
      <Switch v-model:checked="themeStore[mode]" @change="toggleThemeMode"></Switch>
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref } from 'vue';
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
    setup(props) {
      const { themeStore, toggleThemeMode } = useThemeSetting(props);
      return {
        themeStore,
        toggleThemeMode,
      };
    },
  });
</script>
<style lang="less">
  .je-settings-theme-mode {
    text-align: center;
    & > div {
      padding: 5px 0;
    }
  }
</style>
