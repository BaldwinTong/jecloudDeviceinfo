<template>
  <div class="je-settings-theme-color">
    <div>{{ title }}</div>
    <div class="themes">
      <i
        v-for="(item, index) in themeStore.themes"
        :key="index"
        :class="[
          'theme',
          item.code,
          item.code === 'white' ? 'fal' : 'fas',
          themeStore[mode] === item.code ? 'fa-check-square' : 'fa-square',
        ]"
        :style="{ color: item.color }"
        @click="toggleThemeColor(item)"
      ></i>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { useThemeSetting } from './hooks';
  export default defineComponent({
    name: 'SettingsThemeColor',
    props: {
      mode: {
        type: String,
        default: 'systemTheme',
        validator(value) {
          return ['systemTheme', 'siderTheme', 'headerTheme'].includes(value);
        },
      },
      title: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const { themeStore, toggleThemeColor } = useThemeSetting(props);
      return {
        themeStore,
        toggleThemeColor,
      };
    },
  });
</script>
<style lang="less">
  .je-settings-theme-color {
    text-align: center;
    & > div {
      padding: 5px 0;
    }
    .themes {
      display: flex;
      justify-content: center;
      .theme {
        cursor: pointer;
        font-size: 18px;
        margin: 0 4px;
        &.white {
          color: #d8d8d8 !important;
        }
      }
    }
  }
</style>
