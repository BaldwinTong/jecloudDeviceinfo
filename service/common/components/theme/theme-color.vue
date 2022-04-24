<template>
  <div class="je-settings-theme-color">
    <div>{{ title }}</div>
    <div class="themes">
      <div
        v-for="(item, index) in themeStore.themes"
        :key="index"
        :class="['theme-color', item.colour]"
        :style="{
          backgroundColor: item.color,
          borderColor: item.colour === 'dark' ? item.color : darken(item.color, 15),
        }"
        @click="toggleThemeColor(item)"
      >
        <i v-show="themeStore[mode] === item.code" class="fas fa-check" />
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { useThemeSetting } from './hooks';
  import { darken } from '@jecloud/utils';
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
        darken,
      };
    },
  });
</script>
<style lang="less" scoped>
  .je-settings-theme-color {
    text-align: center;
    & > div {
      padding: 5px 0;
    }
    .themes {
      display: flex;
      justify-content: center;
      .theme-color {
        cursor: pointer;
        font-size: 12px;
        margin: 0 4px;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        color: #ffffff;
        border: 1px solid transparent;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        &.light {
          color: #3f3f3f;
        }
      }
    }
  }
</style>
